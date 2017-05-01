var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {
        type: String
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genreModel'
    },
    img: {
        type: String
    },
    year: {
        type: Date
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }
});

bookSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('bookModel', bookSchema);