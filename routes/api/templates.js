var express = require('express');
var templates = express.Router();

var Template = require('../../models/Template');
var seeds = require('../../helpers/seedMessages');
var TemplateDB = require('../../helpers/TemplateDBHelper');

//======================================================================
// Get requests
//======================================================================

templates.get('/all', function (req, res, next) {
	if (req.user.isAdmin === true) {
		TemplateDB.getAll(function (err, templates) {
			if (err) res.status(500).end();
			else res.status(200).json(templates);
		})
	} else res.status(403).json(seeds.NotAuthorized);
});


//======================================================================
// Get requests
//======================================================================

templates.post('/all', function (req, res, next) {
	if (req.user.isAdmin === true) {
		TemplateDB.getAll(function (err, templates) {
			if (err) res.status(500).end();
			else res.status(200).json(templates);
		})
	} else res.status(403).json(seeds.NotAuthorized);
});


//======================================================================
// Export the route
//======================================================================

module.exports = templates;