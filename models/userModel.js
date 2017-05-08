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
    fav_genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genreModel'
    },
    req_books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookModel'
    }],
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
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviewModel'
    }],
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
    }
});
userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('userModel', userSchema);