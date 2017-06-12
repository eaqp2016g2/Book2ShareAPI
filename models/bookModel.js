var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {
        type: String
    },
    genre: {
        type: [String]
    },
    img: {
        type: String
    },
    year: {
        type: Number
    },
    language: {
        type: String
    },
    author: {
        type: [String]
    },
    editorial: {
        type: String
    },
    propietary: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'userModel'
    },
    user: [{
        reader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel'
        },
        approved: {
            type: Boolean
        },
        date: {
            type: Date
        }
    }],
    description: {
        type: String
    },
    date: {
        type: Date
    }

});

bookSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('bookModel', bookSchema);