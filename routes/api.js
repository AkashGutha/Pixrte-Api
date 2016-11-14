var express = require('express');
var api = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/User');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../config/settings.json');

//======================================================================
// Authentication handling using middleware
//======================================================================

// web token check
api.use(function (req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, settings.Secret, function (err, value) {
			if (err) {
				return res.json({
					sucess: false,
					message: "Failed to authenticate token."
				});
			} else {
				req.value = value;
				next();
			}
		});
	} else {
		// return an error if no token is found
		return res.status(403).send({
			success: false,
			message: "No token provided."
		});
	}

});

//======================================================================
// api home route
//======================================================================

api.get('/', function (req, res, next) {
	res.send({
		message: "Welcome to pixrte api endpoint !"
	});
});

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
			res.json({
				sucess: false,
				message: "User already exists"
			});
		} else {

			//save the sample user
			newUser.save(function (err) {
				if (err) throw err;
				console.log('user saved succesfully');;
				res.json({
					sucess: true,
					message: "User created sucesfully"
				});
			});
		}
	});
});

//======================================================================
// Export the route
//======================================================================


module.exports = api;