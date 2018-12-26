/**
 * 数据库
 */
const mysql = require('mysql');

class sqlUtil {
    constructor(params) {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: '3306',
            database: 'meituan'
        });
        this.addSql = 'INSERT INTO list(title,address,imageUrl,aid,areaname) VALUES(?,?,?,?,?)';
        this.modSql = 'UPDATE list SET phone = ? WHERE aid = ?';
        this.params = params;
    }

    insert(callback) {
        this.connection.connect();
        this.connection.query(this.addSql, this.params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                callback(err);
            }else {
                console.log(`插入数据库成功 ${result}`);
                callback();
            }
        });
        this.connection.end();
    }

    update(callback) {
        this.connection.connect();
        this.connection.query(this.modSql, this.params, function (err, result) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                callback(err);
            }else{
                console.log(`更新数据库成功 ${result}`);
                callback();
            }
        });
        this.connection.end();
    }

}

module.exports = sqlUtil;
