const fs = require('fs');
const { Pool } = require('pg');

// Load database credentials from server.json
const config = JSON.parse(fs.readFileSync('server.json', 'utf8'));

// Configure the PostgreSQL connection pool using values from server.json
const pool = new Pool({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.databaseport, // use port from config file
});

module.exports = pool;
