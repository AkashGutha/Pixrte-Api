var Template = require('../../models/Template');
var seeds = require('../../helpers/messages/seedMessages');

//======================================================================
// Get all
//======================================================================

function getALl(callback) {
    Template.find({}, function (err, template) {
        if (err) callback(err, null);
        else callback(null, template);
    });
}

//======================================================================
// Save a template
//======================================================================

function save(template, callback) {
    var query = {
        name: template.name
    }

    Template.findOne(query, function (err, template) {
        if (err) callback(err, null);
        else if (tempmlates) {
            callback(template, null);
        } else {
            Template.save(function (err) {
                if (err) callback(err, null)
                else callback(null, null);
            });
        }
    });
}

//======================================================================
// Update a template
//======================================================================

function save(template, callback) {

    var query = {
        name: template.name
    }

    Template.findOne(query, function (err, template) {
        if (err) callback(err, null);
        else if (tempmlates) {
            callback(template, null);
        } else {
            Template.save(function (err) {
                if (err) callback(err, null)
                else callback(null, null);
            });
        }
    });

}

//======================================================================
// Exports
//======================================================================

exports.getAll = getALl;