// const mariadb = require('mariadb');
// const pool = mariadb.createPool({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'koira123',
// 	database: 'myTable',
// 	connectionLimit: 5
// });

// async function asyncFunction() {
//   let conn;
//   try {

// 	conn = await pool.getConnection();
// 	const rows = await conn.query("SELECT 1 as val");
// 	console.log(rows); //rows: [ {val: 1}, meta: ... ]

// 	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
// 	console.log(res); // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) conn.release(); //release to pool
// 	console.log("Connected to database");
//   }
// }
const mariadb = require("mariadb/callback");
const conn = mariadb.createConnection({
  host: "ec2-13-51-197-128.eu-north-1.compute.amazonaws.com",
  user: "root",
  password: "my-new-password",
  database: "ostojamyynti",
});
conn.connect((err) => {
  if (err) {
    console.log("not connected due to error: " + err);
  } else {
    console.log("connected ! connection id is " + conn.threadId);
  }
});
