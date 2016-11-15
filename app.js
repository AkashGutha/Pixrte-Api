//======================================================================
// Include required files and packages
//======================================================================

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var apiRoute = require('./routes/api');

var app = express();

//======================================================================
// Include settings file
//======================================================================

var settings = require('./config/settings.json');


//======================================================================
// Database connections
//======================================================================

mongoose.Promise = global.Promise;
var db = mongoose.connect(settings.ConnectionUrl).conenction;

//======================================================================
// Middleware injection
//======================================================================

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//======================================================================
// Routes injection
//======================================================================

app.use('/api', apiRoute);
app.use('/', index);

//======================================================================
// Error handling
//======================================================================

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.send({
		error: 'Page not found'
	});
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500).send({
		message: err.msg
	});
});

app.set('port', process.env.PORT || 3000);

//======================================================================
// Export app
//======================================================================

module.exports = app;