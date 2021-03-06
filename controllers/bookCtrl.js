var express = require('express');
var crypto = require('crypto');
var Book = require('../models/bookModel');
var User = require('../models/userModel');
var Genre = require('../models/genreModel');

exports.getBookByID = function (req, res) {
    console.log(req.params);
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
    console.log(req.headers);
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
                    propietary: user._id, date: Date.now(), point: req.body.point
                },
                function (err) {
                    if (err) {
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
            Book.remove({$and: [{_id: req.params.book_id}, {propietary: user._id}]}, function (err) {
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
                        if (book === null) {
                            console.log("Libro: " + req.params.book_id + " Usuario: " + user._id + " = Falso");
                            res.status(200).send({favorite: false, approved: false});
                        }
                        else {
                            console.log("Libro: " + req.params.book_id + " Usuario: " + user._id + " = Verdadero");
                            var aprobado = false;
                            for(var i=0; i < book.user.length; i++){
                                if(book.user[i].approved === true){
                                    aprobado = true;
                                }
                            }
                            res.status(200).send({favorite: true, approved: aprobado});
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
                Book.findOne({_id: req.params.book_id}, function (err, book) {
                    var pedido = false;
                    for (var i = 0; book.user < book.user.length; i++) {
                        if (book.user.reader[i] === user._id) {
                            pedido = true;
                        }
                    }
                    if (!pedido) {
                        Book.update({_id: req.params.book_id}, {
                                $addToSet: {
                                    user: {
                                        reader: user._id,
                                        approved: false,
                                        date: Date.now()
                                    }
                                }
                            },
                            function (err, success) {
                                if (err) {
                                    res.send(err);
                                }
                                else {
                                    User.update({_id: book.propietary},
                                        {
                                            $addToSet: {
                                                notifications: {
                                                    message: "En/na " + user.name + " t'ha demanat el prèstec del llibre " + book.title,
                                                    link: "book",
                                                    icon: "img/accessories-dictionary.svg",
                                                    date: Date.now(),
                                                    read: false
                                                }
                                            }
                                        },
                                        function (err) {
                                            if (err) {
                                                res.send(err);
                                            }
                                        });
                                    res.send(success);
                                }
                            });

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
                Book.update({_id: req.params.book_id}, {$pull: {user: {reader: user._id}}},
                    function (err, success) {
                        if (err) {
                            res.send(err);
                        }
                        else {
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

exports.approveLend = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.update({
                        $and: [{_id: req.params.book_id}, {propietary: user._id}],
                        'user.reader': req.params.user_id
                    },
                    {$set: {"user.$.approved": true}},
                    function (err, success) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            Book.findOne({
                                    $and: [{_id: req.params.book_id}, {propietary: user._id}],
                                    'user.reader': req.params.user_id
                                },
                                function (err, book) {
                                    if (err) {
                                        res.send(err);
                                    }
                                    User.update({_id: req.params.user_id},
                                        {
                                            $addToSet: {
                                                notifications: {
                                                    message: "En/na " + user.name + " ha acceptat el prèstec del llibre "
                                                    + book.title,
                                                    link: "book",
                                                    icon: "img/accessories-dictionary.svg",
                                                    date: Date.now(),
                                                    read: false
                                                }
                                            }
                                        },
                                        function (err) {
                                            if (err) {
                                                res.send(err);
                                            }
                                        });

                                });
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

exports.denyLend = function (req, res) {

    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                Book.update({$and: [{_id: req.params.book_id}, {propietary: user._id}]}, {$pull: {user: {reader: req.params.user_id}}},
                    function (err, result) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(result);
                        }
                    });
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });

};