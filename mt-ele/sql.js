/**
 * 数据库
 */
const mysql = require('mysql');

class sqlUtil {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            port: '3306',
            database: 'meituan'
        });
    }

    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        // 结束会话
                        connection.release();
                    })
                }
            })
        })
    }

}

module.exports = sqlUtil;
