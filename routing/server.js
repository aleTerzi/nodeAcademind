var http = require('http');
var app = require('./app'); //my module

http.createServer(app.handleRequest).listen(8000);
