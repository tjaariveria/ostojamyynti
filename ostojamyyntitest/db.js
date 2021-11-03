// Use the MariaDB Node.js Connector
const mariadb = require('mariadb');
 
// Create a connection pool
const pool = mariadb.createPool({
    host: "ec2-13-48-195-46.eu-north-1.compute.amazonaws.com", 
    user: "root", 
    password: "my-new-password",
    database: "ostojamyynti"
  });
 
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});