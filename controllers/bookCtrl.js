var express = require('express');
var crypto = require('crypto');
var Book = require('../models/bookModel');
var User = require('../models/userModel');

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
exports.getBookByTitle = function (req, res) {
    Book.find({title: req.params.title}, function (err, book) {
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
}
exports.setBooks = function (req, res) {
    Book.create(
        {
            title: req.body.title,
            year: req.body.year, language: req.body.language,
            author: req.body.author, editorial: req.body.editorial
        },
        function (err) {
            if (err)
                res.send(err);
            Book.find(function (err, book) {
                if (err)
                    res.send(err);
                res.json(book);
            });
        });
};

exports.deleteBook = function (req, res) {
    Book.remove({_id: req.params.book_id}, function (err) {
        if (err)
            res.send(err);
        Book.find(function (err, book) {
            if (err)
                res.send(err)
            res.json(book);
        });
    });
}

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
}