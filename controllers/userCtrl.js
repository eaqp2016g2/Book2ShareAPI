/**
 * Created by juan on 17/03/17.
 */
var express = require('express');
var crypto = require('crypto');
var User = require('../models/userModel');
var service = require('../services/service.js')


exports.register = function (req, res) {
    console.log(req.body);
    var user = new User({
        name: req.body.name,
        password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
        email: req.body.email,
        avatar: 'img/user.png'
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
        if (user != null) {
            req.body.password = crypto.createHash('sha256').update(req.body.password).digest('base64');
            if (req.body.password == user.password)
                user.save(function (err, user) {
                    if (err) return res.send(500, err.message);
                    user.password = "";
                    var token="1";
                    res.json({
                        user: user,
                        success: true,
                        //token: service.createToken(user)
                        token: token
                    });
                });
            else
                res.json({success: false, message: 'Error en el usuario o contraseña'});
                console.log("Error en el usuario o contraseña");
        }
        else
            res.json({success: false, message: 'Usuari no trobat'});
    });
};

exports.logout = function (req, res, callback) {
    var token = req.headers.authorization;
    var decoded = verify(token);
    if (decoded) {
        db.get(decoded.auth, function (err, record) {
            if (err) throw err;
            var updated = JSON.parse(record);
            updated.valid = false;
            db.put(decoded.auth, updated, function (err) {
                if (err) throw err;
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end('Sessió tancada');
                return callback(res);
            });
        });
    } else {
        authFail(res, done);
        return callback(res);
    }
};

exports.getUsers = function (req, res) {
    User.find(function (err, user) {
        if (err)
            res.send(err)
        res.json(user);
    });
};

exports.getUserById = function (req, res) {

};

exports.avatarUpload = function (req, res) {
    // create an incoming form object
    var form = new formidable.IncomingForm();
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
    form.parse(req);
};

exports.updateUser = function (req, res){
    User.update( {_id : req.params.user_id},
        {$set:{name : req.body.name, admin: false}},
        function(err) {
            if (err)
                res.send(err);
            User.find(function(err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        });
};

exports.deleteUserById = function (req, res) {

};

exports.getBooksByUserId = function (req, res) {

};

exports.getNotifications = function (req, res) {

};