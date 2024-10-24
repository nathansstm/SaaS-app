// ApiSend.js
const express = require('express');
const { VM } = require('vm2'); // Import VM2
const router = express.Router();

// NEW /api/send ROUTE
router.post('/send', (req, res) => {
  const { code } = req.body; // Get the JavaScript code from the request body

  // Basic validation to check if code is provided
  if (!code) {
    return res.status(400).json({ output: 'No code provided.' });
  }

  // Initialize an array to capture console output
  let consoleOutput = [];

  const vm = new VM({
    timeout: 1000, // Set a timeout for execution
    sandbox: {
      console: {
        log: (...args) => {
          // Capture console log output and push it to the array
          consoleOutput.push(args.map(arg => String(arg)).join(' '));
        },
      },
    },
  });

  // Prepare the code to be run in the VM with custom error handling
  const wrappedCode = `
    (() => {
        try {
            ${code}; // Execute user code
            return;
        } catch (err) {
            return { error: String(err) }; // Return error object
        }
    })();
  `;

  try {
    // Run the wrapped code in the VM
    const output = vm.run(wrappedCode);

    // Log the captured console output for debugging
    console.log('Captured Console Output:', consoleOutput);

    // Determine what to return based on the console output
    const finalOutput = consoleOutput.length > 0 
      ? consoleOutput.join('\n') // Join console logs into a single string
      : output && output.error 
        ? output.error // If there's an error, use that
        : typeof output === 'object' ? JSON.stringify(output) : String(output); // Otherwise, stringify the output

    // Return the final output as JSON
    res.json({ output: finalOutput });
  } catch (error) {
    console.error('Error executing code:', error);
    res.status(500).json({ output: 'Failed to execute code.', details: error.message });
  }
});

module.exports = router;


