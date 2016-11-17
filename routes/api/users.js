var express = require('express');
var users = express.Router();

var UserDB = require('../../helpers/UserDBHelper');
var User = require('../../models/User');
var seeds = require('../../helpers/seedMessages');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../../config/settings.json');

//======================================================================
// GET requests for Users
//======================================================================

users.get('/:username', function (req, res, next) {
	if (req.user.username === req.params.username || req.user.isAdmin === true) {

		UserDB.find(req.params.username, function (err, user) {
			if (err)
				res.status(500).end();
			if (user)
				res.status(200).json(user);
			else res.status(403).json(seeds.UserNotFound);
		});
	} else if (req.user.username !== req.params.username) {
		res.status(403).json(seeds.NotAuthorized);
	} else {
		res.status(500).end();
	}
});

//======================================================================
// PUT requests for Users
//======================================================================


users.put('/:username', function (req, res, next) {

	res.status(500).end();
});

//======================================================================
// DELETE requests for Users
//======================================================================


users.delete('/:username', function (req, res, next) {

	if (req.user.username === req.params.username || req.isAdmin === true)
		UserDB.remove(req.user, function (err, user) {
			return res.status(200).json(user);
		});
	else res.status(500).end();
});

//======================================================================
// Export the route
//======================================================================

module.exports = users;