var mongoose = require('mongoose');

module.exports = mongoose.model('book',{
    titulo: String,
    genero: String,
    publicacion:Number,
    idioma: String,
    autor:[String],
    editorial:String,
    usuario: String,
    comentarios:[String]

});