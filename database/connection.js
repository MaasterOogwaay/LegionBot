/**
 * Imports
 */
require('dotenv').config({ path: '../.env' });
const mysql = require('mysql');

/**
 * Class constants
 */
const discord_db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

/**
 * Connect to database
 */
discord_db.connect(function(err) {
  if (err) throw err;
  console.log("[discord_db] Successfully connected!");
});

/**
 * Export connection
 */
module.exports = {
  discord_db
};
