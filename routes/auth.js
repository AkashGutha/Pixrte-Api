var express = require('express');
var auth = express.Router();
var jwt = require('jsonwebtoken');

var seeds = require('../helpers/seedMessages');
var User = require('../models/User');
var Token = require('../models/Token');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../config/settings.json');

//======================================================================
// Signin handling
//======================================================================

auth.post('/signin', function (req, res, next) {

	if (!(req.query.username !== undefined && req.query.password !== undefined)) {
		res.json(seeds.MissingCredentials);
		return;
	}

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
			if (!User.validate(newUser.password, user.password)) {
				res.json(seeds.PasswordMatchFailure);
			} else {

				var query = {
					username: user.username,
					isAdmin: user.isAdmin
				};

				// if user is found and password is right
				// create a token
				var token = new Token({
					value: jwt.sign(query, settings.Secret, {
						expiresIn: settings.expirationTime // expires in 1 hour
					}),
					username: user.username
				});

				//save the  token
				Token.findOne(query, function (err, prevToken) {
					if (err) throw err;
					if (prevToken) {
						prevToken.remove(query);
					}
					token.save();
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

	if (!(req.query.username !== undefined && req.query.password !== undefined && req.query.email !== undefined)) {
		res.json(seeds.MissingCredentials);
		return;
	}

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
			//save the  user
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


//======================================================================
// Signout handling
//======================================================================

auth.post('/signout', function (req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (value) Token.remove({
		value: token
	});

});

module.exports = auth;