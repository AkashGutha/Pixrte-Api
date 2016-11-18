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

function update(user, newData, callback) {

	this.find(user.username, function (err, user) {

		if (err) callback(err);

		user.save(function (err) {
			if (err) callback(err);
			else callback(null);
		});

	});
}

//======================================================================
// Delete a user
//======================================================================

function remove(user, callback) {
	User.findByIdAndRemove(user._id, callback);
}

//======================================================================
// Exports
//======================================================================


exports.save = save;
exports.find = find;
exports.update = update;
exports.remove = remove;
exports.findAll = findAll;