// var mongoose = require('mongoose');
//
// module.exports = mongoose.model('userModel',{
//     name: String,
//     password: String,
//     email: String,
//     avatar: String,
//     longitud: Number,
//     latitud: Number,
//     puntuacion: Number,
//     librosint: [String],
//     librosped: [String]
// });


var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {type: String, required: true},
    admin: {type: Boolean, required: true},
    password: {type: String, select: false},
    avatar: {type: String},
    fav_genre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genreModel'
    }],
    fav_books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookModel'
    }],
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