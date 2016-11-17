var User = require('../models/User');
var seeds = require('../helpers/seedMessages');

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
// Save a user
//======================================================================

function save(newUser, callback) {
	this.find(newUser.username, function (err, user) {

		if (err) callback(err, null);
		if (user) {
			callback(null, user);
		} else {
			//save 	User.finBthe sample user and send response
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

function update(user, callback) {
	User.findByIdAndRemove(user._id, callback);
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
exports.remove = remove;