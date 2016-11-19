var express = require('express');
var api = express.Router();
var jwt = require('jsonwebtoken');

var UserDB = require('../helpers/DB/UserDBHelper');

var seeds = require('../helpers/messages/seedMessages');
var User = require('../models/User');
var Token = require('../models/Token');

var userRoute = require('./api/users');
var orderRoute = require('./api/orders');
var accountRoute = require('./api/account');
var templateRoute = require('./api/templates');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../config/settings.json');

//======================================================================
// Register Un Authenticated API routes
//======================================================================

api.use('/account', accountRoute);

//======================================================================
// api users setup
//======================================================================

api.post('/setup', function (req, res, next) {

	//create a sample user.
	var newUser = new User({
		username: "akash1",
		email: "akash.gutha@outlook.com",
		password: User.encrypt("password"),
		isAdmin: true
	});

	UserDB.save(newUser, res);
});

//======================================================================
// Authentication handling using middleware
//======================================================================

// web token check
api.use(function (req, res, next) {

	if (req.originalUrl.includes('/api/account')) {
		next();
	} else {

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, settings.Secret, function (err, decoded) {
				if (err) {
					return res.status(403).json(seeds.TokenAuthFailed);
				} else {

					UserDB.find(decoded.username, function (err, user) {
						if (err) {
							return res.status(403).json(seeds.TokenAuthFailed);
						} else {
							req.token = token;
							req.user = user;
							next();
						}
					});

					// req.token = token;
					// next();
				}
			});
		} else {
			// return an error if no token is found
			return res.status(403).send(seeds.TokenNotFound);
		}
	}
});


//======================================================================
// Register authenticated API routes
//======================================================================

api.use('/users', userRoute);
api.use('/orders', orderRoute);
api.use('/templates', templateRoute);

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