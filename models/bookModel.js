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
<<<<<<< HEAD
        ref: 'userModel'
    },
    point: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'interchangePointModel'
    },
=======
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
>>>>>>> 943df0c5d3ea32efe9efbe213f715742b0ecccec
    description: {
        type: String
    },
    date: {
        type: Date
    }

});

bookSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('bookModel', bookSchema);