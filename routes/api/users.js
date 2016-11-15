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
// Users CRUD operations
//======================================================================

users.get('/:username', function (req, res, next) {
	if (req.username === req.params.username || req.isAdmin === true)
		UserDB.findOneByUsername(req.params.username, function (err, user) {
			return res.status(200).json(user);
		});
	else res.status(500).end();
})

.post('/:username', function (req, res, next) {
	if (req.username === req.params.username || req.isAdmin === true)
		UserDB.findOneByUsername(req.params.username, function (err, user) {
			return res.status(200).json(user);
		});
	else
		res.status(500).end();
})

.delete('/:username', function (req, res, next) {
	if (req.username === req.params.username || req.isAdmin === true)
		UserDB.findOneByUsername(req.params.username, function (err, user) {
			return res.status(200).json(user);
		});
	else
		res.status(500).end();
})

.put('/:username', function (req, res, next) {
	if (req.username === req.params.username || req.isAdmin === true)
		UserDB.findOneByUsername(req.params.username, function (err, user) {
			return res.status(200).json(user);
		});
	else
		res.status(500).end();
});

//======================================================================
// Export the route
//======================================================================

module.exports = users;