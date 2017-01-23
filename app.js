var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var config = require('./config');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var mongoose = require('./libs/mongoose');
var HttpError = require('./error').HttpError;
var session = require('express-session');
var router = express.Router();
var sassMiddleware = require('node-sass-middleware');
var view = require('view');
var pug = require('pug');

// var users = require('./routes/users');

var app = express();
var sourceFiles = '/source/templates/pages';

// view engine setup
app.use(express.static(path.join(__dirname, 'build')));
app.set('views', __dirname + sourceFiles);
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if(app.get('env') == 'development') {
	app.use(logger('dev'));
} else {
	app.use(logger('deafault'));
}
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(require('./middleware/sendHttpError'));
app.use(router);
require('./routes')(app);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  if(typeof err == 'number') {
    err = new HttpError(err);
  }

  if(err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') == 'development') {
      app.use(errorhandler()(err, req, res, next));
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

module.exports = app;
