var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database:'ItTechnology'
});

connection.connect();

module.exports = connection;