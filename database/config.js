
const mysql = require('mysql');
require("dotenv").config();

const con = mysql.createConnection
    ({
        host: process.env.HOST,
        user: process.env.USUARIO,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: 3306
    });

    con.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);

          return;
        }
      
        console.log('connected as id ' + con.threadId);
      });
module.exports = {
    con
}