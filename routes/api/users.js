var express = require('express');
var users = express.Router();

//======================================================================
// Include settings file
//======================================================================

var settings = require('../../config/settings.json');

//======================================================================
// Users CRUD operations
//======================================================================

users.get('/users/:username', function (req, res, next) {
	res.json(settings);
})

.post('/setup', function (req, res, next) {

})

.delete('/setup', function (req, res, next) {

})

.put('/setup', function (req, res, next) {

})

//======================================================================
// Export the route
//======================================================================

module.exports = users;