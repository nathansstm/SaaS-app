const jwtSecret = process.env.JWT_SECRET;
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { VM } = require('vm2'); // Add this line to import the VM class

const pool = require('./db');

const app = express();

const ApiLogin = require('./ApiLogin');
const ApiLogout = require('./ApiLogout');
const ApiAuthorize = require('./ApiAuthorize');
const ApiSend = require('./ApiSend');
const ApiAdd = require('./ApiAdd');
const ApiLoad = require('./ApiLoad');
const ApiUpdate = require('./ApiUpdate');
const ApiRemove = require('./ApiRemove');
const AppRoute = require('./AppRoute');
const AppArray = require('./AppArray');

const config = JSON.parse(fs.readFileSync('server.json', 'utf8'));
const port = config.port || 3000; // Default to 3000 if port is not set

// Middleware for parsing JSON request bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Use the login route
app.use('/api', ApiLogin);
// Use the logout route
app.use('/api', ApiLogout);
// Use the authorize route
app.use('/api', ApiAuthorize);
// Use the send route
app.use('/api', ApiSend);
// Use the add route
app.use('/api', ApiAdd);
// Use the load route
app.use('/api', ApiLoad);
// Use the update route
app.use('/api', ApiUpdate);
// Use the remove route
app.use('/api', ApiRemove);
// Use the trace route
app.use('/api', AppRoute);
// Use the array route
app.use('/api', AppArray);

app.listen(port, () => console.log(`Server running on port ${port}`));


