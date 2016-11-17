var express = require('express');
var templates = express.Router();

var seeds = require('../../helpers/seedMessages');
var Template = require('../../models/Template');
var TemplateDB = require('../../helpers/TemplateDBHelper');

//======================================================================
// GET requests
//======================================================================

templates.get('/all', function (req, res, next) {
	TemplateDB.getAll(function (err, templates) {
		if (err) res.status(500).end();
		else res.status(200).json(templates);
	});
});


//======================================================================
// POST requests
//======================================================================

templates.post('/:name', function (req, res, next) {
	if (req.user.isAdmin === true) {
		TemplateDB.save(function (err, templates) {
			if (err) res.status(500).end();
			else if (templates) res.status(500).json(seeds.ResourceExists);
			else res.status(200).json(seeds.ResourceCreadted);
		})
	} else res.status(403).json(seeds.NotAuthorized);
});



//======================================================================
// PUT requests
//======================================================================

templates.put('/:name', function (req, res, next) {
	if (req.user.isAdmin === true) {
		TemplateDB.save(function (err, templates) {
			if (err) res.status(500).end();
			else if (templates) res.status(500).json(seeds.ResourceExists);
			else res.status(200).json(seeds.ResourceCreadted);
		})
	} else res.status(403).json(seeds.NotAuthorized);
});

//======================================================================
// DELETE requests
//======================================================================

templates.delete('/:name', function (req, res, next) {
	if (req.user.isAdmin === true) {
		TemplateDB.save(function (err, templates) {
			if (err) res.status(500).end();
			else if (templates) res.status(500).json(seeds.ResourceExists);
			else res.status(200).json(seeds.ResourceCreadted);
		})
	} else res.status(403).json(seeds.NotAuthorized);
});



//======================================================================
// Export the route
//======================================================================

module.exports = templates;