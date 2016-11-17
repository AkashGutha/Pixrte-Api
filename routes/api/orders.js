var express = require('express');
var Orders = express.Router();

var Order = require('../../models/Order');
var seeds = require('../../helpers/messages/seedMessages');

var OrderDB = require('../../helpers/DB/OrderDBHelper');

//======================================================================
// GET requests for Orders 
//======================================================================

Orders.get('/all', function (req, res, next) {
    if (req.user.isAdmin === true) {
        OrderDB.getAll(function (err, orders) {
            if (err) res.status(500).end();
            else res.status(200).json(orders);
        });
    } else res.status(403).json(seeds.NotAuthorized);
});

Orders.get('/my', function (req, res, next) {
    OrderDB.get(req.user.username, function (err, orders) {
        if (err) res.status(500).end();
        else res.status(200).json(orders);
    });
});

Orders.get('/:id', function (req, res, next) {
    var ab = req.user.orders;
    if (req.user.isAdmin === true || req.user.orders) {
        OrderDB.getByNumber(req.params.id, function (err, orders) {
            if (err) res.status(500).end();
            else res.status(200).json(orders);
        });
    } else res.status(403).json(seeds.NotAuthorized);
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