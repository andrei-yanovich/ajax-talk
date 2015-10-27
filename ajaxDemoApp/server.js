//var http = require('http');
//
//http.createServer(function (req, res) {
//    
//    res.writeHead(200, { 'Content-Type': 'text/html' });
//    res.end('Hello, world!');
//    
//}).listen(process.env.PORT || 8080);

var debug = require('debug')('AjaxTalk');
var app = require('./app');

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});