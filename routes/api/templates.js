var express = require('express');
var Templates = express.Router();

var seeds = require('../../helpers/messages/seedMessages');
var Template = require('../../models/Template');
var TemplateDB = require('../../helpers/DB/TemplateDBHelper');

//======================================================================
// GET requests
//======================================================================

Templates.get('/', function (req, res, next) {

	if (req.query.name) {

		TemplateDB.get(req.query.name, function (err, template) {
			if (err) res.status(500).end();
			else if (template) res.status(200).json(template);
			else res.status(400).json(seeds.ResourceNotFound);
		});

	} else {
		TemplateDB.getAll(function (err, templates) {
			if (err) res.status(500).end();
			else res.status(200).json(templates);
		});

	}
});


//======================================================================
// POST requests
//======================================================================

Templates.post('/:name', function (req, res, next) {
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

Templates.put('/:name', function (req, res, next) {
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

Templates.delete('/:name', function (req, res, next) {
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

module.exports = Templates;