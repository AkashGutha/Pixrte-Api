var Template = require('../models/Template');
var seeds = require('../helpers/seedMessages');


//======================================================================
// Get all
//======================================================================

function getALl (callback) {
    Template.find({}, function (err, template) {
        if (err) callback(err, null);
		else callback(null, orders);        
    });
}


//======================================================================
// Save a template
//======================================================================

function save (template , callback) {
    Template.find({name : template.name}, function (err, template) {
        if (err) callback(err, null);
		else callback(null, orders);        
    });
}



exports.getAll = getALl;