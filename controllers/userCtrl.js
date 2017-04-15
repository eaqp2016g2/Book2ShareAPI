/**
 * Created by juan on 17/03/17.
 */
var express = require('express');
var crypto = require('crypto');
var userModel = require('../models/userModel');
var service = require('../services/service.js')


exports.register = function (req, res) {
    console.log(req.body);
    var user = new userModel({
        name: req.body.name,
        password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
        email: req.body.email,
        avatar: 'img/user.png'
    });

    user.save(function (err, user) {
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
    userModel.findOne({'email': req.body.email}, function (err, user) {
        if (user != null) {
            req.body.password = crypto.createHash('sha256').update(req.body.password).digest('base64')
            if (req.body.password == user.password)
                user.save(function (err, user) {
                    if (err) return res.send(500, err.message);
                    user.password = "";
                    res.json({
                        user: user,
                        success: true,
                        token: service.createToken(user)
                    });
                });
            else
                res.json({success: false, message: 'Error en el usuario o contraseña'});
        }
        else
            res.json({success: false, message: 'Usuari no trobat'});
    });
};

exports.logout = function (req, res, callback) {

};

exports.getUsers = function (req, res) {
    userModel.find(function (err, user) {
        if (err)
            res.send(err)
        res.json(user);
    });
};

exports.getUserById = function (req, res) {

};

exports.avatarUpload = function (req, res) {

};

exports.updateUser = function (req, res){
    User.update( {_id : req.params.user_id},
        {$set:{name : req.body.name, admin: false}},
        function(err) {
            if (err)
                res.send(err);
            Persona.find(function(err, user) {
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