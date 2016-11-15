var express = require('express');
var users = express.Router();

var User = require('../../models/User');

//======================================================================
// Include settings file
//======================================================================

var settings = require('../../config/settings.json');

//======================================================================
// Users CRUD operations
//======================================================================

users.get('/:username', function (req, res, next) {
	if (req.username === req.params.username || req.isAdmin === true) {
		console.log('faskjdfjk.sdfjk.sdjksdf');
	}

})

.post('/:username', function (req, res, next) {

})

.delete('/:username', function (req, res, next) {

})

.put('/:username', function (req, res, next) {

});

//======================================================================
// Export the route
//======================================================================

module.exports = users;