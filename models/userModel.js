var mongoose = require('mongoose');

module.exports = mongoose.model('user',{
    name: String,
    password: String,
    email: String,
    avatar: String,
    localizacion: Number,
    puntuacion: Number,
    librosint: [String],
    librosped: [String]
});