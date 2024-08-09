
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

module.exports = {
    con
}