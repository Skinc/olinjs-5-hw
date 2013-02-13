
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , mainPage = require("./routes/mainPage")
  , Facebook = require('facebook-node-sdk');


var app = express();

app.configure(function(){
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost/myplace');
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({ appId: '552433498108752', secret: 'c166904fd442482a15b8747ee8d12d2b'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/users', user.list);
app.get('/', Facebook.loginRequired(), mainPage.makePage);
app.get('/logout', mainPage.getUser(), mainPage.makePage);

//   function(req, res){
//     res.send("hello there", req.user);
// })

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
