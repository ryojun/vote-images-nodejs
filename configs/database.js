const mysql = require('mysql');
// const connection = mysql.createPool({
//     host : 'localhost',
//     user : 'root',
//     password : 'neverend',
//     database : 'foods_db',
//     charset : 'utf8'
// });

const connection = mysql.createPool({
    host : 'localhost',
    user : 'u559630928_ryothesis',
    password : 'Neverend29378',
    database : 'u559630928_ryothesis',
    charset : 'utf8'
});
module.exports = connection;