var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var messagingSchema = new Schema({
    userA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    userB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    content: {
        type: String
    },
    date: {
        type: Date
    },
    delivered: {
        type: Boolean
    },
    read: {
        type: Boolean
    }
});

messagingSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('messagingModel', messagingSchema);
