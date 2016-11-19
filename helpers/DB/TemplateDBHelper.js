var Template = require('../../models/Template');
var seeds = require('../../helpers/messages/seedMessages');

//======================================================================
// Get template functions
//======================================================================

function get(name, callback) {

	var query = {
		name: name
	}
	Template.findOne(query, function (err, template) {
		if (err) callback(err, null);
		else callback(null, template);
	});
}

function getAll(callback) {
	Template.find({}, function (err, template) {
		if (err) callback(err, null);
		else callback(null, template);
	});
}

//======================================================================
// Save a template
//======================================================================

function save(name, newTemplate, callback) {

	var query = {
		name: name
	}
	var options = {
		new: true,
		upsert: true,
		runValidators: true,
		maxTimeMS: 1000
	}

	Template.findOneAndUpdate(query, newTemplate, options, function (err, template) {
		console.log(err);
		if (err) callback(err, null);
		callback(null, template)
	});
}

//======================================================================
// Delete a template
//======================================================================

function remove(name, callback) {
	var query = {
		name: name
	}

	Template.findOneAndRemove(query, function (err, template) {

		if (err) callback(err, null);
		else callback(null, template);

	});
}

//======================================================================
// Exports
//======================================================================

exports.get = get;
exports.getAll = getAll;
exports.save = save;
exports.remove = remove;