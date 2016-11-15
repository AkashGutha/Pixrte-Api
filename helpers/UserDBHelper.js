var User = require('../models/User');
var seeds = require('../helpers/seedMessages');

function findOne(query, callback) {
	User.findOne(query, function (err, user) {
		if (err) throw err;
		callback(null, user);
	});
}

function findOneByUsername(name, callback) {

	User.findOne({
		username: name
	}, function (err, user) {
		if (typeof callback === 'function') {
			if (err) throw err;
			callback(null, user);
		}
	});
}

function save(newUser, res) {
	this.findOneByUsername(newUser.username, function (err, user) {
		if (err) throw err;
		if (user) {
			res.json(seeds.UserExists);
		} else {
			//save the sample user
			newUser.save(function (err) {
				if (err) throw err;
				res.json(seeds.UserCreated);
			});
		}
	});
}

exports.save = save;
exports.findOne = findOne;
exports.findOneByUsername = findOneByUsername;