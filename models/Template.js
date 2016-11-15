var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//======================================================================
// Schema declaration
//======================================================================

var templateSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	price: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Template', templateSchema);