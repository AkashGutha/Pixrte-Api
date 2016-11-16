var User = require('../models/User');
var seeds = require('../helpers/seedMessages');

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

function save(newUser, res) {
	this.find(newUser.username, function (err, user) {

		if (err) throw err;
		if (user) {
			res.json(seeds.UserExists);
		} else {
			//save 	User.finBthe sample user and send response
			newUser.save(function (err) {
				if (err) throw err;
				res.json(seeds.UserCreated);
			});
		}
	});
}

function remove(user, callback) {
	User.findByIdAndRemove(user._id, callback);
}


exports.save = save;
exports.find = find;
exports.remove = remove;