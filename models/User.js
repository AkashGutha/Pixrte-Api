var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//======================================================================
// Schema declaration
//======================================================================

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	}
});

//======================================================================
// Encryption and Validation helpers
//======================================================================


userSchema.statics.encrypt = function(password) {
    return bcrypt.hashSync(password);
};

userSchema.statics.validate = function(password,hash) {
    return bcrypt.compareSync(password,hash);
};

//======================================================================
// Export declaration
//======================================================================

module.exports = mongoose.model('User', userSchema);