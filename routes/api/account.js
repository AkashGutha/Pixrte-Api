var express = require('express');
var account = express.Router();
var jwt = require('jsonwebtoken');

var UserDB = require('../../helpers/UserDBHelper');

var seeds = require('../../helpers/seedMessages');
var User = require('../../models/User');
var Token = require('../../models/Token');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../../config/settings.json');

//======================================================================
// Signin handling
//======================================================================

account.post('/signin', function (req, res, next) {

	if (!(req.body.username !== undefined && req.body.password !== undefined)) {
		res.json(seeds.MissingCredentials);
		return;
	}

	//create a sample user.
	var newUser = new User({
		username: req.body.username,
		password: req.body.password
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

				var body = {
					username: user.username,
					isAdmin: user.isAdmin
				};

				// if user is found and password is right
				// create a token
				var token = new Token({
					value: jwt.sign(body, settings.Secret, {
						expiresIn: settings.expirationTime // expires in 1 hour
					}),
					username: user.username
				});

				//save the  token
				Token.findOne(body, function (err, prevToken) {
					if (err) throw err;
					if (prevToken) {
						prevToken.remove(body);
					}
					token.save();
				});

				// return the information including token as JSON
				res.json(seeds.TokenCreated(token.value));
			}
		}
	});
});


//======================================================================
// Signup handling
//======================================================================

account.post('/signup', function (req, res, next) {

	if (!(req.body.username !== undefined && req.body.password !== undefined && req.body.email !== undefined)) {
		res.json(seeds.MissingCredentials);
		return;
	}

	//create a sample user.
	var newUser = new User({
		username: req.body.username,
		password: User.encrypt(req.body.password),
		email: req.body.email,
		isAdmin: false
	});

	UserDB.save(newUser, res);
});


//======================================================================
// Signout handling
//======================================================================

account.post('/signout', function (req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.headers['x-access-token'];
	if (token) Token.remove({
		value: token
	}, function (err) {
		if (err) res.status(500).end();
		else res.status(200);
	});
	res.status(500).end();
});

//======================================================================
// Export the route
//======================================================================

module.exports = account;