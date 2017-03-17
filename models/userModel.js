var mongoose = require('mongoose');

module.exports = mongoose.model('user',{
    name: String,
    email:String,
    password:String,
    avatar: String,
    localizacion: number,
    puntuacion: number,
    librosint: [String],
    librosped: [String]
});