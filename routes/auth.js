var express = require('express');
var auth = express.Router();
var jwt = require('jsonwebtoken');

var seeds = require('../helpers/seedMessages');
var User = require('../models/User');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../config/settings.json');


//======================================================================
// Signin handling
//======================================================================

auth.post('/signin', function (req, res, next) {

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
			res.json(seeds.UserNotFound);

		} else if (user) {

			// check if password matches
			if (!User.validate(newUser.password,user.password)) {
				res.json(seeds.PasswordMatchFailure);
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, settings.Secret, {
					expiresIn: settings.expirationTime // expires in 1 hour
				});

				// return the information including token as JSON
				res.json(seeds.TokenCreated(token));
			}
		}
	});
});


//======================================================================
// Signup handling
//======================================================================

auth.post('/signup', function (req, res, next) {

	//create a sample user.
	var newUser = new User({
		username: req.query.username,
		password: User.encrypt(req.query.password),
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
				res.json(seeds.UserCreated);
			});

		} else if (user) {
			// return the information including token as JSON
			res.json(seeds.UserExists);
		}
	});
});

module.exports = auth;