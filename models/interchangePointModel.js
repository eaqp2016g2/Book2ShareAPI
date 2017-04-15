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
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    description: {
        type: String
    },
    photo: {
        type: String
    }
});

interchangePointSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('interchangePointModel', interchangePointSchema);