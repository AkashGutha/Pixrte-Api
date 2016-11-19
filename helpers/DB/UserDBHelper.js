var User = require('../../models/User');
var seeds = require('../../helpers/messages/seedMessages');

//======================================================================
// Find User by name 
//======================================================================

function find(name, callback) {
	User.findOne({
			username: name
		},
		function (err, user) {
			if (err) callback(err, null);
			//send callback after getting the user
			if (typeof callback === 'function') {
				callback(null, user);
			}
		});
}

//======================================================================
// Find all users
//======================================================================

function findAll(callback) {
	User.find({},
		function (err, user) {
			if (err) callback(err, null);
			//send callback after getting the user
			if (typeof callback === 'function') {
				callback(null, user);
			}
		});
}

//======================================================================
// Save a user
//======================================================================

function save(newUser, callback) {

	this.find(newUser.username, function (err, user) {

		if (err) callback(err, null);
		if (user) {
			callback(null, user);
		} else {
			//save 	User
			newUser.save(function (err) {
				if (err) callback(err, null);
				else callback(null, null);
			});
		}
	});
}


//======================================================================
// Update a user
//======================================================================

function update(username, newUser, callback) {

	var query = {
		username: username
	}

	var options = {
		new: true,
		upsert: true,
		runValidators: true,
		maxTimeMS: 1000
	}

	User.findOneAndUpdate(query, newUser, options, function (err, user) {
		console.log(err);
		if (err) callback(err, null);
		callback(null, user)
	});
}

//======================================================================
// Delete a user
//======================================================================

function remove(username, callback) {
	var query = {
		username: username
	}

	User.findOneAndRemove(query, function (err, user) {

		if (err) callback(err, null);
		else callback(null, user);

	});
}

//======================================================================
// Exports
//======================================================================


exports.find = find;
exports.findAll = findAll;
exports.save = save;
exports.update = update;
exports.remove = remove;