var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//======================================================================
// Schema declaration
//======================================================================

var tokenSchema = new Schema({
	value: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	username: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Token', schema);