var express = require('express');
var orders = express.Router();

var Order = require('../../models/Order');

//======================================================================
// Export the route
//======================================================================

module.exports = orders;