var User = require('../../models/User');
var Order = require('../../models/Order');
var seeds = require('../../helpers/messages/seedMessages');


//======================================================================
// GET all orders
//======================================================================

function getAll(callback) {

	Order.find({}, function (err, orders) {
		if (err) callback(err, null);
		else callback(null, orders);
	});

}

//======================================================================
// GET orders by username
//======================================================================

function getOrdersByUsername(username, callback) {

	var query = {
		username: username
	};

	Order.find(query, function (err, orders) {
		if (err) callback(err, null);
		else callback(null, orders);

	});
}

//======================================================================
// GET orders by order number
//======================================================================

function getOrderByNumber(order_no, callback) {

	var query = {
		order_no: order_no
	};

	Order.find(query, function (err, orders) {
		if (err) callback(err, null);
		else callback(null, orders);
	});
}

function updateOrder(username, callback) {

}

//======================================================================
// Exports
//======================================================================

exports.get = getOrdersByUsername;
exports.getByNumber = getOrderByNumber;
exports.getAll = getAll;
exports.update = updateOrder;