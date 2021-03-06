var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    admin: {type: Boolean},
    email: {type: String},
    password: {type: String},
    name: {type: String},
    avatar: {type: String},
    sex: {
        type: Boolean
    },
    biography: {
        type: String
    },
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'interchangePointModel'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messagingModel'
    }],
    conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }],
    notifications: [{
        message: {type: String},
        link: {type: String},
        icon: {type: String},
        date: {type: Date},
        read: {type: Boolean}
    }],
    settings: {
        allow_notifications: {type: Boolean},
        colour: {
            primario: {type: String},
            secundario: {type: String}
        }
    },
    google: {
        id: {type: String},
        token: {type: String},
        email: {type: String},
        name: {type: String},
    },
    twitter: {
        id: {type: String},
        token: {type: String},
        email: {type: String},
        name: {type: String},
    },
    tokens: [{
        token: {type: String},
        lastLogin: {type: Date}
    }]
});
userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('userModel', userSchema);