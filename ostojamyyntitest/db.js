// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');
 
// Create a connection pool
var pool = 
  mariadb.createPool({
    host: "ec2-13-51-197-128.eu-north-1.compute.amazonaws.com", 
    user: "root", 
    password: "my-new-password",
    database: "todo"
  });
 
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});