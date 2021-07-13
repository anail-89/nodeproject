// const random = require('random');
// const test = require('./test');
// test.foo();
// test.go();
// console.log(random.int(5, 10));
// console.log(process.env.port)
const config = require("./config.json")[process.env.NODE_ENV];
const http = require('http');
const server = http.createServer((req, res) => {
    res.end('ok');
});
server.listen(config.port, config.host);
console.log(config.port);