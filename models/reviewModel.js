/**
 * Created by juan on 14/04/17.
 */

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookModel'
    },
    score: {
        type: Number
    },
    body: {
        type: String
    },
    date: {
        type: Date
    }
});

reviewSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('reviewModel', reviewSchema);
