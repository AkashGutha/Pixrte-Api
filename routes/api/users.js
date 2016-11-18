var express = require('express');
var Users = express.Router();

var UserDB = require('../../helpers/DB/UserDBHelper');
var User = require('../../models/User');
var seeds = require('../../helpers/messages/seedMessages');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../../config/settings.json');

//======================================================================
// GET requests for Users
//======================================================================

Users.get('/', function (req, res, next) {

	// if query is empty.
	if (!req.query.name) res.status(400).end();

	// if the request name is all
	else if (req.query.name === "all") {
		if (req.user.isAdmin === true) {

			UserDB.findAll(function (err, users) {
				if (err)
					res.status(500).end();
				else res.status(200).json(users);
			});
		} else res.status(403).json(seeds.NotAuthorized);
	}

	// if the request name is me
	else if (req.query.name === "me") {
		UserDB.find(req.user.username, function (err, user) {
			if (err)
				res.status(500).end();
			if (user)
				res.status(200).json(user);
			else res.status(403).json(seeds.UserNotFound);
		});
	}

	// if the request name is a anything else
	else {
		if (req.user.username === req.query.name || req.user.isAdmin === true) {
			UserDB.find(req.query.name, function (err, user) {
				if (err)
					res.status(500).end();
				if (user)
					res.status(200).json(user);
				else res.status(403).json(seeds.UserNotFound);
			});
		} else if (req.user.username !== req.query.name) {
			res.status(403).json(seeds.NotAuthorized);
		} else {
			res.status(500).end();
		}
	}
});



//======================================================================
// PUT requests for Users
//======================================================================


Users.put('/:username', function (req, res, next) {

	var newData = req.body;

	//validate the new Data //code here

	//if valid update the user data
	UserDB.update(req.user, newData, function (err) {
		if (err) res.status(400).end();
		else res.status(200).json(seeds.UseUpdated);
	});

});

//======================================================================
// DELETE requests for Users
//======================================================================


Users.delete('/:username', function (req, res, next) {

	if (req.user.username === req.params.username || req.isAdmin === true)
		UserDB.remove(req.user, function (err, user) {
			return res.status(200).json(user);
		});
	else res.status(500).end();
});

//======================================================================
// Export the route
//======================================================================

module.exports = Users;