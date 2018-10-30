const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect();

let table = 'list';

let selSql = `SELECT * FROM ${table}`;

let addSql = `INSERT INTO ${table}(id,con) VALUES(0,?)`;
let addSqlParams = ['菜鸟工具'];

var modSql = `UPDATE ${table} SET con = ? WHERE id = ?`;
var modSqlParams = ['菜鸟移动站', 26];

var delSql = `DELETE FROM ${table} where id=26`;

connection.query(addSql, addSqlParams, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});

connection.end();