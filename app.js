
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , sockets = require('socket.io')
  , path = require('path')
  , ddb = require('./ddb/ddb.js');

var app = express()
  , server = http.createServer(app)
  , io = sockets.listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/list', routes.list);
app.get('/create', routes.create);
app.post('/createTable', routes.createTable)
app.get('/describe', routes.describe);
app.post('/describeTable', routes.describeTable)
app.get('/robots.txt', function(req, res){
  res.sendfile(__dirname+ '/public/pages/robots.txt');
}); 

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 100); 
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { 'sockets.io status': 'OK' });
});

server.listen(app.get('port'), function(){
  ddb.ping();
  console.log("Express server listening on port " + app.get('port'));
});
