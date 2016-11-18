var Template = require('../../models/Template');
var seeds = require('../../helpers/messages/seedMessages');

//======================================================================
// Get all
//======================================================================

function getAll(callback) {
	Template.find({}, function (err, template) {
		if (err) callback(err, null);
		else callback(null, template);
	});
}

function get(name, callback) {
	var query = {
		name: name
	}
	Template.findOne(query, function (err, template) {
		if (err) callback(err, null);
		else callback(null, template);
	});
}

//======================================================================
// Save a template
//======================================================================

function save(template, callback) {
	var query = {
		name: template.name
	}

	Template.findOne(query, function (err, template) {
		if (err) callback(err, null);
		else if (tempmlates) {
			callback(template, null);
		} else {
			Template.save(function (err) {
				if (err) callback(err, null)
				else callback(null, null);
			});
		}
	});
}

//======================================================================
// Update a template
//======================================================================

function update(template, newTemplate, callback) {

	var query = {
		name: template.name
	}

	Template.findOne(query, function (err, template) {
		if (err) callback(err, null);
		else if (tempmlate) {
			Template.save(function (err) {
				if (err) callback(err, null)
				else callback(null, null);
			});
		}
	});

}

//======================================================================
// Delete a template
//======================================================================

function remove(template, callback) {
	var query = {
		name: template.name
	}

	Template.findOne(query, function (err, template) {
		if (err) callback(err, null);
		else if (tempmlates) {
			callback(template, null);
		} else {
			Template.save(function (err) {
				if (err) callback(err, null)
				else callback(null, null);
			});
		}
	});
}

//======================================================================
// Exports
//======================================================================

exports.getAll = getAll;
exports.save = save;
exports.update = update;
exports.remove = remove;