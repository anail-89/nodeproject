const http = require('http');
const express = require('express');
const app = express();
const router = require('./router');
const cors = require('cors');
//const mysql = require('mysql');
//database
const db = require('./models');


//test db connection
// db.authenticate()
//     .then(() => {
//         console.log('Database connected...');
//         db.sync();
//         /*db.query('CREATE TABLE IF NOT EXISTS Users (id serial PRIMARY KEY, name VARCHAR(50), username VARCHAR(50) UNIQUE NOT NULL,image VARCHAR(250), email VARCHAR(200) UNIQUE NOT NULL, password VARCHAR(100))', (err, res) => {
//             if (err) throw new Error(err);
//             else {
//                 console.log('success created table');

//             }
//         });*/
//         /* db.query('CREATE TABLE IF NOT EXISTS Posts (id serial PRIMARY KEY, title VARCHAR(250), description TEXT,author )', (err, res) => {
//              if (err) throw new Error(err);
//              else {
//                  console.log('success created table');

//              }
//          });*/

//     })
//     .catch((err) => console.log(err));
global.__homedir = __dirname;

//db.sequelize.sync({}).then(() => {
db.sequelize.authenticate().then(() => {
    console.log('connected');
    db.sequelize.sync({}).then(() => {
        console.log('sync');
        app.use(cors());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        router(app);
        http.createServer(app).listen(8080);
    });
}).catch(err => console.log(err.message));

//});









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