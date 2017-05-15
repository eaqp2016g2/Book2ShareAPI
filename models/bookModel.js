var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {
        type: String
    },
    genre: {
        type: [String]
        /*type: mongoose.Schema.Types.ObjectId,
        ref: 'genreModel'*/
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
        type: String
        /*type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'*/
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    description: {
        type: String
    }
});

bookSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('bookModel', bookSchema);