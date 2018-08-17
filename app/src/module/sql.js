var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'life'
// });
var connection;
//异常处理自动连接
function handleError(err) {
    if (err) {
        // 如果是连接异常，自动重新连接
        console.log('mysql err code:' + err.code);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR' || err.code === 'ETIMEDOUT') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}

function connect(){
    connection = mysql.createConnection({
        host: '39.105.23.187',
        user: 'root',
        port: '8080',
        password: 'admin123',
        database: 'life'
    });
    // connection = mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'life'
    // });
    connection.connect();
    connection.on('error', handleError);
}

connect()

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});



const query = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, res) => {
            if (err) return reject(new Error(err));
            res = res ? Object.values(res) : {};
            return resolve(res);
        });
    });
};

const change = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, res) => {
            if (err) return reject(new Error(err));
            res = res ? Object.values(res) : {};
            return resolve(res);
        });
    });
};

module.exports = {
    query,
    change
}
