var express = require('express');
var crypto = require('crypto');
var Book = require('../models/bookModel');
var User = require('../models/userModel');
var Genre = require('../models/genreModel');

exports.getBookByID = function (req, res) {
    Book.findOne({_id: req.params.book_id}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBookByPropietary = function (req, res) {
    Book.find({propietary: req.params.propietary}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBookByTitle = function (req, res) {
    Book.find({title: {$regex: '' + req.params.title, $options:"i"}}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBookByAuthor = function (req, res) {
    Book.find({author: {$regex: '' + req.params.author, $options:"i"}}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBookByGenre = function (req, res) {
    Book.find({genre: {$regex: '' + req.params.genre, $options:"i"}}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBookByLanguage = function (req, res) {
    Book.find({language: {$regex: '' + req.params.language, $options:"i"}}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBooks = function (req, res) {
    Book.find(function (err, book) {
        if (err)
            res.send(err)
        res.json(book);
    });
};

exports.addBooks = function (req, res) {
    Book.create(
        {
            title: req.body.title,
            year: req.body.year, language: req.body.language, genre: req.body.genre,
            author: req.body.author, editorial: req.body.editorial, description: req.body.description,
            propietary: req.body.propietary
        },
        function (err) {
            if (err)
                res.send(err);
            else
            res.json({success: true, message: 'Llibre publicat'});
        });
};

exports.deleteBook = function (req, res) {
    Book.remove({_id: req.params.book_id}, function (err) {
        if (err)
            res.send(err);
        Book.find(function (err, book) {
            if (err)
                res.send(err);
            res.json(book);
        });
    });
};

exports.addGenre = function (req,res){
    Genre.create(
        {
            name: req.body.name,
            img: req.body.image,
            description: req.body.description
        },
        function (err) {
            if (err)
                res.send(err);
            else
                res.json({success: true, message: 'Gènere afegit'});
        })
};

exports.deleteGenre = function (req,res){
    Genre.remove({_id: req.params.genre_id}, function (err) {
        if (err)
            res.send(err);
        Genre.find(function (err, genre) {
            if (err)
                res.send(err);
            res.json(genre);
        });
    });
};

exports.getGenres = function (req, res) {
    Genre.find(function (err, genre) {
        if (err)
            res.send(err);
        res.json(genre);
    });
};

exports.addBooktoUser = function (req,res){
    User.findOne({'_id': req.params.user_id}, function (err, user) {
        if (err) return res.send(500, err.message);
        if (!user) {
            res.json({success: false, message: 'Usuari no trobat'});
        } else if (user) {
            user.books.push(book._id);

            var notification = {
                read: "false",
                message: "Tens un nou llibre en prèstec",
                icon: "book.png",
                date: Date()
            };
            user.notifications.push(notification);
            user.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(book);
            });
        }
    });
};
