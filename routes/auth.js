var express = require('express');
var auth = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/User');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../config/settings.json');


//======================================================================
// Signin handling
//======================================================================

auth.get('/signin', function (req, res, next) {

	//create a sample user.
	var newUser = new User({
		username: req.query.username,
		password: req.query.password
	});

	User.findOne({
		username: newUser.username
	}, function (err, user) {

		if (err) throw err;

		if (!user) {

			res.json({
				success: false,
				message: 'Authentication failed. User not found.'
			});

		} else if (user) {

			// check if password matches
			if (user.password != newUser.password) {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password.'
				});
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, settings.Secret, {
					expiresIn: settings.expirationTime // expires in 1 hour
				});

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Token generated sucessfully',
					token: token
				});
			}
		}
	});
});


//======================================================================
// Signup handling
//======================================================================

auth.get('/signup', function (req, res, next) {

	//create a sample user.
	var newUser = new User({
		username: req.query.username,
		password: req.query.password,
		email: req.query.email,
		isAdmin: false
	});

	User.findOne({
		username: newUser.username
	}, function (err, user) {

		if (err) throw err;

		if (!user) {

			//save the sample user
			newUser.save(function (err) {
				if (err) throw err;
				res.json({
					sucess: true,
					message: "User created sucesfully"
				});
			});

		} else if (user) {

			// return the information including token as JSON
			res.json({
				success: false,
				message: 'User exists'
			});
		}
	});
});

module.exports = auth;