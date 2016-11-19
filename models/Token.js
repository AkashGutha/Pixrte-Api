var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//======================================================================
// Schema declaration
//======================================================================

var tokenSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Token', tokenSchema);