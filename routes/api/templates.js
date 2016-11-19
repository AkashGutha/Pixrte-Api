var express = require('express');
var Templates = express.Router();

var seeds = require('../../helpers/messages/seedMessages');
var Template = require('../../models/Template');
var TemplateDB = require('../../helpers/DB/TemplateDBHelper');

var TemplateValidator = require('../../helpers/DataValidators/TemplateDataValidator');

//======================================================================
// GET requests
//======================================================================

Templates.get('/', function (req, res, next) {

	// if query is empty.
	if (!req.query.name) res.status(400).end();

	// if the request name is all
	else if (req.query.name === "all") {
		TemplateDB.getAll(function (err, templates) {
			if (err) res.status(500).end();
			else res.status(200).json(templates);
		});
	}

	// if the request name is a anything else
	else {
		TemplateDB.get(req.query.name, function (err, template) {
			if (err) res.status(500).end();
			else if (template) res.status(200).json(template);
			else res.status(400).json(seeds.ResourceNotFound);
		});
	}
});


//======================================================================
// POST requests
//======================================================================

Templates.post('/', function (req, res, next) {

	if (req.user.isAdmin === true) {
		TemplateDB.save(req.body.name, req.body, function (err, template) {
			if (err) res.status(500).end();
			else if (template) res.status(200).json(seeds.ResourceCreadted);
			else res.status(500).json(seeds.ResourceExists);
		})
	} else res.status(403).json(seeds.NotAuthorized);

});

//======================================================================
// PUT requests
//======================================================================

Templates.put('/', function (req, res, next) {
	if (req.user.isAdmin === true) {
		TemplateDB.save(req.body.name, req.body, function (err, template) {
			if (err) res.status(500).end();
			else if (template) res.status(500).json(seeds.ResourceUpdated);
			else res.status(400).end();
		})
	} else res.status(403).json(seeds.NotAuthorized);

});

//======================================================================
// DELETE requests
//======================================================================

Templates.delete('/', function (req, res, next) {
	if (req.user.isAdmin === true) {
		TemplateDB.remove(req.query.name, function (err, template) {
			if (err) res.status(500).json(err);
			else if (template) res.status(200).json(seeds.ResourceRemoved);
			else res.status(400).json(seeds.ResourceNotFound);
		})
	} else res.status(403).json(seeds.NotAuthorized);
});



//======================================================================
// Export the route
//======================================================================

module.exports = Templates;