const express = require('express');
const opentelemetry = require('@opentelemetry/api');
const { Resource } = require('@opentelemetry/resources');
const { SEMRESATTRS_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const router = express.Router();
let lastTraceId = null;  // To keep track of the last trace ID

// Store provider at module level
let provider = null;

const createTracer = (serviceName) => {
  // Create a new resource with the service name
  const resource = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: serviceName,
  });

  // If provider exists, force unregister
  if (provider) {
    opentelemetry.trace.disable();
  }

  // Create new provider with the new resource
  provider = new BasicTracerProvider({
    resource: resource,
  });

  const exporter = new JaegerExporter({
    endpoint: 'http://localhost:14268/api/traces',
  });
  
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

  // Register the provider with force flag
  provider.register({
    forceFlush: true
  });

  // Create a new tracer instance with unique name including service name
  return provider.getTracer(`example-basic-tracer-node-${serviceName}`);
};

// Define the route with dynamic span naming and trace linking
router.get('/span/:page', async (req, res) => {
  const { page } = req.params;

  // Initialize tracer with the page name as the service name
  const tracer = createTracer(page);

  // Dynamically name the span and start it
  const spanName = `/GET ${page}`;
  const span = tracer.startSpan(spanName);

  // Set the 'from' attribute using the last trace ID (if it exists)
  if (lastTraceId) {
    span.setAttribute('from', lastTraceId);
  }

  // Set 'to' attribute with the current trace ID
  const currentTraceId = span.spanContext().traceId;
  span.setAttribute('to', currentTraceId);

  try {
    // Send response
    res.send(`Trace for page: ${page} with trace ID: ${currentTraceId}`);
  } catch (error) {
    span.recordException(error);
    res.status(500).send('Span Push Error');
  } finally {
    // Update lastTraceId to the current trace ID for the next span
    lastTraceId = currentTraceId;

    // Ensure span ends
    span.end();
    
    // Force flush to ensure spans are exported
    await provider.forceFlush();
  }
});

module.exports = router;
