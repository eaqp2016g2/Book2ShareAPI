/**
 * Created by juan on 14/04/17.
 */

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var interchangePointSchema = new Schema({
    name: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    description: {
        type: String
    },
    books:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bookModel'
        }]
});

interchangePointSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('interchangePointModel', interchangePointSchema);
