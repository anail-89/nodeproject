const http = require('http');
const express = require('express');
const app = express();
const router = require('./router');
const cors = require('cors');
const mysql = require('mysql');

global.__homedir = __dirname;



app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());






// var connection = mysql.createConnection({
//     host: 'localhost',
//     database: 'nodejs',
//     user: 'root',
//     password: ''
// });
// connection.connect(function(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('connected as id ' + connection.threadId);
//     http.createServer(app).listen(2021);
// });
// connection.query('SELECT * FROM users', function(error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });
// connection.end(function(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
// });
// app.use((req, res, next) => {
//     console.log(req.query.id);
//     console.log(req.body);
//     console.log('log');

//     next();
// });
// app.use('/posts', (req, res, next) => {
//     res.write('Posts');
//     next();
// });

http.createServer(app).listen(3000);