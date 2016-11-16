var express = require('express');
var orders = express.Router();

var Order = require('../../models/Order');
var seeds = require('../../helpers/seedMessages');

var OrderDB = require('../../helpers/OrderDBHelper');

//======================================================================
// GET requests for Orders 
//======================================================================

orders.get('/all', function (req, res, next) {
	if (req.user.isAdmin === true) {
		OrderDB.getAll(function (err, orders) {
			if (err) res.status(500).end();
			else res.status(200).json(orders);
		});
	} else res.status(403).json(seeds.NotAuthorized);
});

orders.get('/:id', function (req, res, next) {
	var ab = req.user.orders;
	if (req.user.isAdmin === true || req.user.orders) {
		OrderDB.getByNumber(req.params.id, function (err, orders) {
			if (err) res.status(500).end();
			else res.status(200).json(orders);
		});
	} else res.status(403).json(seeds.NotAuthorized);
});

orders.get('/my', function (req, res, next) {
	OrderDB.get(req.user.username, function (err, orders) {
		if (err) res.status(500).end();
		else res.status(200).json(orders);
	});
})

//======================================================================
// Export the route
//======================================================================

module.exports = orders;