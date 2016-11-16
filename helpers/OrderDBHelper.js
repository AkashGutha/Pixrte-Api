var User = require('../models/User');
var Order = require('../models/Order');
var seeds = require('../helpers/seedMessages');

function getAll(callback) {

	Order.find({}, function (err, orders) {
		if (err) callback(err, null);
		else callback(null, orders);
	});
	
}


function getOrdersByUsername(username, callback) {

	var query = {
		username: username
	};

	Order.find(query, function (err, orders) {
		if (err) callback(err, null);
		else callback(null, orders);

	});
}

function getOrderByNumber(order_no, callback) {

	var query = {
		order_no: order_no
	};

	Order.find(query, function (err, orders) {
		if (err) callback(err, null);
		else callback(null, orders);
	});
}

function postOrderByUsername(username, callback) {

}

exports.get = getOrdersByUsername;
exports.getByNumber = getOrderByNumber;
exports.getAll = getAll;
exports.post = postOrderByUsername;