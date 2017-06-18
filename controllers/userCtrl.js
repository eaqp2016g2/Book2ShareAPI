/**
 * Created by juan on 17/03/17.
 */
var express = require('express');
var crypto = require('crypto');
var User = require('../models/userModel');
var service = require('../services/service.js');


exports.register = function (req, res) {
    console.log(req.body);
    var user = new User({
        name: req.body.name,
        password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
        email: req.body.email,
        avatar: '../img/user-identity.svg',
        settings: {
            colour: {
                primario: 'blue',
                secundario: 'green'
            }
        }
    });

    user.save(function (err) {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        console.log("Registre correcte");
        exports.login(req, res);
    });
};

exports.login = function (req, res) {
    console.log(req.body);
    User.findOne({'email': req.body.email}, function (err, user) {
        if (user !== null) {
            req.body.password = crypto.createHash('sha256').update(req.body.password).digest('base64');
            if (req.body.password === user.password) {
                if (err) {
                    return res.send(500, err.message);
                }
                var token = service.createToken(user);
                var newToken = {
                    token: token,
                    lastLogin: Date()
                };
                addToken(user, token);
                user.password = "";
                res.json({
                    user: user,
                    success: true,
                    token: token
                });
                console.log("Inici de sessió");
            }
            else {
                res.json({success: false, message: 'Error en el usuario o contraseña'});
                console.log("Error en el usuario o contraseña");
            }
        }
        else
            res.json({success: false, message: 'Usuari no trobat'});
    });
};

function addToken(user, token) {
    var query = {_id: user._id};
    var update = {
        $addToSet: {
            tokens: {token: token, lastLogin: Date()}
        }
    };
    var options = {};

    User.findOneAndUpdate(query, update, options, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            User.findById(user._id).populate('token').exec().then(function (err, user) {
                if (err) {
                    res.send(err);
                }
                res.send(user);
            });
        }
    });
}

exports.logout = function (req, res) {
    console.log("Tanca sessió");
    var query = {_id: req.body.user_id};
    var update = {$pull: {tokens: {token: req.body.token}}};
    var options = {};

    //console.log(req.body.user_id);
    //console.log(req.body.token);

    User.findOneAndUpdate(query, update, options, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            User.findById(user._id).populate('tokens').exec().then(function (err, user) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    user: user,
                    success: true
                });
            });
        }
    });
};

exports.getUsers = function (req, res) {
    User.find(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.getUserById = function (req, res) {
    User.findOne({_id: req.params.user_id},
        function (err, user) {
            if (err)
                res.send(500, err);
            if (!user) {
                res.json({success: false, message: 'Usuari no trobat'});
            } else if (user) {
                res.status(200).json(user);
            }
        })
};

exports.avatarUpload = function (req, res) {
    // create an incoming form object
    /*var form = new formidable.IncomingForm();
     // specify that we want to allow the user to upload multiple files in a single request
     form.multiples = true;
     // store all uploads in the /uploads directory
     form.uploadDir = path.join(__dirname, '/uploads');
     // every time a file has been uploaded successfully,
     // rename it to it's orignal name
     form.on('file', function (field, file) {
     fs.rename(file.path, path.join(form.uploadDir, file.name));
     });
     // log any errors that occur
     form.on('error', function (err) {
     console.log('An error has occured: \n' + err);
     });
     // once all the files have been uploaded, send a response to the client
     form.on('end', function () {
     res.end('success');
     });
     // parse the incoming request containing the form data
     form.parse(req);*/
    upload.single('avatar')

};

exports.updateUser = function (req, res) {
    if (req.body.password === undefined) {
        User.update({_id: req.params.user_id},
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    //password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
                    sex: req.body.sex,
                    biography: req.body.biography
                }
            },
            function (err) {
                if (err) {
                    res.send(err);
                }
                User.findOne({_id: req.params.user_id},function (err, user) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(user);
                });
            });
    }
    else {

        User.update({_id: req.params.user_id},
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
                    sex: req.body.sex,
                    biography: req.body.biography
                }
            },
            function (err) {
                if (err)
                    res.send(err);
                User.findOne({_id: req.params.user_id},function (err, user) {
                    if (err)
                        res.send(err);
                    res.json(user);
                });
            });
    }
};

exports.deleteUser = function (req, res) {
    User.findByIdAndRemove({_id: req.params.user_id}, function (err) {
        if (err) return res.send(500, err.message);
        res.status(200).send("Eliminat");
    });

};

exports.getBooksByUserId = function (req, res) {

};

exports.getNotifications = function (req, res) {

};