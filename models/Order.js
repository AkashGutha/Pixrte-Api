var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//======================================================================
// Schema declaration
//======================================================================

var orderSchema = new Schema({
	order_no: {
		type: Number,
		require: true,
		index: true,
		unique: true
	},
	template: {
		type: Schema.Types.Mixed,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	path_to_storage: {
		type: String,
		required: true
	},
	no_of_items: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	in_progress: {
		type: Boolean,
		required: false
	},
	is_cancelled: {
		type: Boolean,
		required: true
	},
	user_accepted: {
		type: Boolean,
		required: true
	}
}, {
	strict: false
});

module.exports = mongoose.model('Order', orderSchema);