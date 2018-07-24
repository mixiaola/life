var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'life'
// });

var connection = mysql.createConnection({
    host: '39.105.23.187',
    user: 'root',
    port: '8080',
    password: 'admin123',
    database: 'life'
});

connection.connect();

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
