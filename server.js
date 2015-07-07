var http = require('http');

var queryString = require('querystring');
var router = require('./router');

var server = http.createServer(function(req,res){
    router(req,res)
}).listen(80)


