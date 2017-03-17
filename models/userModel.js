var mongoose = require('mongoose');

module.exports = mongoose.model('user',{
    usuario: String,
    localizacion: number,
    puntuacion: number,
    librosint: [String],
    librosped: [String]
});