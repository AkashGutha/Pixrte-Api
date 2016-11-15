var express = require('express');
var api = express.Router();
var jwt = require('jsonwebtoken');

var seeds = require('../helpers/seedMessages');
var User = require('../models/User');
var Token = require('../models/Token');

var userRoute = require('./api/users');
var orderRoute = require('./api/orders');
var templateRoute = require('./api/templates');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../config/settings.json');

//======================================================================
// Register API routes
//======================================================================

api.use('/users', userRoute);
//api.use('/orders', orderRoute);
//api.use('/templates', templateRoute);

//======================================================================
// api users setup
//======================================================================

api.get('/setup', function (req, res, next) {

	//create a sample user.
	var newUser = new User({
		username: "akash",
		email: "akash.gutha@outlook.com",
		password: "password",
		isAdmin: true
	});

	User.findOne({
		username: newUser.username
	}, function (err, user) {
		if (err) throw err;
		if (user) {
			res.json(seeds.UserExists);
		} else {

			//save the sample user
			newUser.save(function (err) {
				if (err) throw err;
				res.json(seeds.UserCreated);
			});
		}
	});
});

//======================================================================
// Authentication handling using middleware
//======================================================================

// web token check
api.use(function (req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, settings.Secret, function (err, decoded) {
			if (err) {
				return res.status(403).json(seeds.TokenAuthFailed);
			} else {

				req.token = token;
				req.username = decoded.username;
				req.isAdmin = decoded.isAdmin;

				next();
			}
		});
	} else {
		// return an error if no token is found
		return res.status(403).send(seeds.TokenNotFound);
	}

});

//======================================================================
// API home route
//======================================================================

api.get('/', function (req, res, next) {
	res.send({
		message: "Welcome to pixrte api endpoint !"
	});
});

//======================================================================
// Export the route
//======================================================================

module.exports = api;