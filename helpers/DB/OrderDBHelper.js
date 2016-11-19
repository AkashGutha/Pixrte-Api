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

//======================================================================
// Save an order
//======================================================================

function save(order, callback) {

	this.find(order.order_no, function (err, user) {

		if (err) callback(err, null);
		if (user) {
			callback(null, user);
		} else {
			//save 	User
			order.save(function (err) {
				if (err) callback(err, null);
				else callback(null, null);
			});
		}
	});
}


//======================================================================
// Update a user
//======================================================================

function update(username, order, callback) {

	var query = {
		username: username
	}

	var options = {
		new: true,
		upsert: true,
		runValidators: true,
		maxTimeMS: 1000
	}

	User.findOneAndUpdate(query, order, options, function (err, user) {
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

exports.get = getOrdersByUsername;
exports.getByNumber = getOrderByNumber;
exports.getAll = getAll;
exports.update = update;