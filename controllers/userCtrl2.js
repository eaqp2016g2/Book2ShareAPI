/**
 * Created by juan on 17/03/17.
 */
var express = require('express');
var crypto = require('crypto');

var userModel = require('../models/userModel');

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
        exports.login(req, res);
    });
};

exports.login = function (req,res) {
    console.log(req.body);
}


/* exports.register = function (req, res) {
    user.create({name:req.body.name, email:req.body.email, password:req.body.password, avatar:'imagen.png'},
    function(err, user){
        if (err)
        res.send(err);
        user.find(function(err,user){
            if (err)
            res.send(err)
            res.json(user);
        });
    }); */