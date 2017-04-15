/**
 * Created by juan on 15/04/17.
 */

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    read: {
        type: Boolean
    },
    message: {
        type: String
    },
    icon: {
        type: String
    },
    date: {
        type: Date
    }
});

notificationSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('notificationModel', notificationSchema);

