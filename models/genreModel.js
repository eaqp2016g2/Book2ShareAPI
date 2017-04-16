/**
 * Created by juan on 15/04/17.
 */

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
    name: {
        type: String
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookModel'
    }],
    description: {
        type: String
    },
    img: {
        type: String
    }
});

genreSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('genreModel', genreSchema);