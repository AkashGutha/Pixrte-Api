var express = require('express');
var Orders = express.Router();

var Order = require('../../models/Order');
var seeds = require('../../helpers/messages/seedMessages');

var OrderDB = require('../../helpers/DB/OrderDBHelper');
var OrderValidator = require('../../helpers/DataValidators/OrderDataValidator');

//======================================================================
// GET requests for Orders 
//======================================================================

Orders.get('/', function (req, res, next) {

	// if the query is empty send bad request reposnse.
	if (!req.query.id) res.status(400).end();

	// if queried for all
	else if (req.query.id === "all") {

		if (req.user.isAdmin === true) {
			OrderDB.getAll(function (err, orders) {
				if (err) res.status(500).end();
				else res.status(200).json(orders);
			});
		} else res.status(403).json(seeds.NotAuthorized);
	}

	// if queried for the specidfic user
	else if (req.query.id === "me") {

		if (req.user.isAdmin === true) {
			OrderDB.get(req.user.username, function (err, orders) {
				if (err) res.status(500).end();
				else res.status(200).json(orders);
			});
		} else res.status(403).json(seeds.NotAuthorized);
	}

	// if queried for id get that order
	else if (req.query.id) {

		if (req.user.isAdmin === true || req.user.orders) {
			OrderDB.getByNumber(req.params.id, function (err, orders) {
				if (err) res.status(500).end();
				else res.status(200).json(orders);
			});
		} else res.status(403).json(seeds.NotAuthorized);

	}

	// if queried for username get all the orders for him.
	else if (req.query.username) {

	}

	// if nothing matches send an internal server error.
	else res.status(500).end();

});

Orders.get('/:id', function (req, res, next) {
	var ab = req.user.orders;

});

//======================================================================
// POST requests for Orders 
//======================================================================

Orders.post('/:id', function (req, res, next) {
	if (req.user.isAdmin === true) {
		OrderDB.getAll(function (err, orders) {
			if (err) res.status(500).end();
			else res.status(200).json(orders);
		});
	} else res.status(403).json(seeds.NotAuthorized);
});


//======================================================================
// PUT requests for Orders 
//======================================================================

Orders.put('/:id', function (req, res, next) {
	if (req.user.isAdmin === true) {
		OrderDB.getAll(function (err, orders) {
			if (err) res.status(500).end();
			else res.status(200).json(orders);
		});
	} else res.status(403).json(seeds.NotAuthorized);
});


//======================================================================
// DELETE requests for Orders 
//======================================================================

Orders.delete('/:id', function (req, res, next) {
	if (req.user.isAdmin === true) {
		OrderDB.getAll(function (err, orders) {
			if (err) res.status(500).end();
			else res.status(200).json(orders);
		});
	} else res.status(403).json(seeds.NotAuthorized);
});



//======================================================================
// Export the route
//======================================================================

module.exports = Orders;