var express = require('express');
var crypto = require('crypto');
var bookModel = require('../models/bookModel');

exports.getBooks=function(req,res){
    bookModel.find(function(err,book){
            if (err)
            res.send(err)
            res.json(book);
        });
}
exports.setBooks = function(req, res) {
		bookModel.create(
			{titulo : req.body.titulo, genero: req.body.genero, publicacion: req.body.publicacion,
        idioma: req.body.idioma, autor: req.body.autor, editorial: req.body.editorial,
        usuario: req.body.usuario, comentario: req.body.comentario},
			function(err, book) {
				if (err)
					res.send(err);
				bookModel.find(function(err, book) {
				 	if (err)
				 		res.send(err)
				 	res.json(book);
				});
			});
	}
