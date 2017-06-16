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

exports.getBooksByPropietary = function (req, res) {
    Book.find({propietary: req.params.propietary}, function (err, books) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(books);
        }
    })
};

exports.getBookByTitle = function (req, res) {
    Book.find({title: {$regex: '' + req.params.title, $options: "i"}}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBookByAuthor = function (req, res) {
    Book.find({author: {$regex: '' + req.params.author, $options: "i"}}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBookByGenre = function (req, res) {
    Book.find({genre: {$regex: '' + req.params.genre, $options: "i"}}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBookByLanguage = function (req, res) {
    Book.find({language: {$regex: '' + req.params.language, $options: "i"}}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};
exports.getBookByPoint = function (req, res) {
    Book.find({point: req.params.point}, function (err, book) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(book);
        }
    })
};

exports.getBooks = function (req, res) {
    Book.find(function (err, books) {
        if (err)
            res.send(err);
        res.json(books);
    });
};

exports.addBook = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) return res.send(500, err.message);
        if (!user) {
            res.json({success: false, message: 'Usuari propietari no trobat'});
        } else if (user) {
            Book.create(
                {
                    title: req.body.title,
                    year: req.body.year, language: req.body.language, genre: req.body.genre,
                    author: req.body.author, editorial: req.body.editorial, description: req.body.description,
                    propietary: user._id, date: Date.now(),point: req.body.point
                },
                function (err) {
                    if (err){
                        console.log(err);
                        res.send(err);
                    }
                    else
                        res.json({success: true, message: 'Llibre publicat'});
                });
        }
    });
};

exports.updateBook = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) return res.send(500, err.message);
        if (!user) {
            res.json({success: false, message: 'Usuari propietari no trobat'});
        } else if (user) {
            Book.update({_id: req.params.book_id},
                {
                    $set: {
                        title: req.body.title,
                        year: req.body.year,
                        language: req.body.language,
                        genre: req.body.genre,
                        author: req.body.author,
                        editorial: req.body.editorial,
                        description: req.body.description,
                        propietary: user._id
                    }
                },
                function (err) {
                    if (err)
                        res.send(err);
                    else
                        res.json({success: true, message: 'Llibre editat'});
                })
        }
    });
};

exports.deleteBook = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) return res.send(500, err.message);
        if (!user) {
            res.json({success: false, message: 'Usuari propietari no trobat'});
        } else if (user) {
            Book.remove({$and: [{_id: req.params.book_id},{propietary: user._id}]}, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({success: true, message: 'Llibre eliminat'});
                }
            });
        }
    });
};

/** GENRE ***/

exports.addGenre = function (req, res) {
    Genre.create(
        {
            name: req.body.name,
            description: req.body.description
        },
        function (err) {
            if (err) {
                res.send(err);
            }
            Genre.find(function (err, genres) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(genres);
                }
            });
        })
};

exports.deleteGenre = function (req, res) {
    Genre.remove({_id: req.params.genre_id}, function (err) {
        if (err){
            res.send(err);}
        Genre.find(function (err, genres) {
            if (err) {
                res.send(err);
            }
            else {
            res.json(genres);
            }
        });
    });
};

exports.getGenres = function (req, res) {
    Genre.find(function (err, genres) {
        if (err)
        {
            res.send(err);
        }
        res.json(genres);
    });
};

/*** INTERCHARGE POINT ***/

//// REVISAR

exports.setBookPoint = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.update({'propietary': user._id},
                    {$set: {point: req.body.point}},
                    function (err, book) {
                        if (err) {
                            res.status(500).send("No hi ha llibres");
                        }
                        else {
                            res.send(book);
                        }
                    });
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });
};

exports.deleteBookPoint = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.update({'propietary': user._id},
                    {$pull: {point: req.body.point}},
                    function (err, book) {
                    if (err) {
                        res.status(500).send("No hi ha llibres");
                    }
                    else {
                        res.send(book);
                    }
                });
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });
};

/*** FAVORITE ***/

exports.getOurRequestedBooks = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.find({'user.reader': user._id}, function (err, books) {
                    if (err) {
                        res.status(500).send("No hi ha llibres");
                    }
                    else {
                        res.send(books);
                    }
                });
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });
};

/*** OK ***/

exports.checkRequest = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.findOne({$and: [{_id: req.params.book_id}, {'user.reader': user._id}]}, function (err, book) {
                    if (err) {
                        res.status(500).send("Error");
                    }
                    else {
                        if(book === null){
                            console.log("Libro: " + req.params.book_id + " Usuario: " + user._id + " = Falso");
                            res.status(200).send(false);
                        }
                        else{
                            console.log("Libro: " + req.params.book_id + " Usuario: " + user._id + " = Verdadero");
                            res.status(200).send(true);
                        }
                    }
                });
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });
};

/*** OK ***/

exports.markAsRequested = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.update({_id: req.params.book_id}, {$addToSet: {user: {reader: user._id, approved: false, date: Date.now()}}},
                    function (err, success) {
                        if (err) {
                            res.send(err);
                        }
                        else{
                            res.send(success);
                        }
                    });
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });
};

/*** OK ***/

exports.unMarkAsRequested = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.update({_id: req.params.book_id}, {$pull: {user: {reader : user._id}}},
                    function (err, book) {
                        if (err) {
                            res.send(err);
                        }
                        else{
                            res.send(book);
                        }
                    });
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });
};

exports.approveLend = function (req, res) {

    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.update({$and: [{_id: req.params.book_id},{propietary: user._id}],'user.reader': req.params.user_id},
                    {$set: {"user.$.approve" : true}},
                    function (err, book) {
                        if (err) {
                            res.send(err);
                        }
                        else{
                            res.send(book);
                        }
                    });
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });

};

exports.denyLend = function (req, res) {

    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.update({$and: [{_id: req.params.book_id},{propietary: user._id}]}, {$pull: {user: {reader : req.params.user_id}}},
                    function (err, book) {
                        if (err) {
                            res.send(err);
                        }
                        else{
                            res.send(book);
                        }
                    });
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });

};

/// ????

exports.addBooktoUser = function (req, res) {
    User.findOne({'_id': req.params.user_id}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
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