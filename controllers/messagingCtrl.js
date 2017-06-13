/**
 * Created by juan on 14/04/17.
 */

var Message = require('../models/messagingModel');
var User = require('../models/userModel');
var service = require('../services/service.js');

/*** OK ***/

exports.sendMessage = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, userA) {
        if (err) return res.send(500, err.message);
        if (!userA) {
            res.json({success: false, message: 'Usuari origen no trobat'});
        } else if (userA) {
            User.findOne({_id: req.body.userB}, function (err, userB) {
                if (err) return res.send(500, err.message);
                if (!userB) {
                    res.json({success: false, message: 'Usuari destí no trobat'});
                } else if (userB) {
                    User.update({_id: userA._id},
                        {$addToSet: {conversations: userB._id}},
                        function (err) {
                            if (err)
                                res.send(err);
                        });
                    User.update({_id: userB._id},
                        {$addToSet: {conversations: userA._id}},
                        function (err) {
                            if (err)
                                res.send(err);
                        });
                    Message.create(
                        {
                            userA: userA._id, userB: userB._id, content: req.body.content,
                            date: Date(), read: false, delivered: false
                        },
                        function (err) {
                            if (err)
                                res.send(err);
                            Message.find(function (err, message) {
                                if (err)
                                    res.send(err);
                                res.json(message);
                            });
                        });
                }
            });
        }
    });
};

/*** OK ***/

exports.getMessagesByUser = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            console.log("Nuestro usuario: " + user._id + " y el otro: " + req.params.user_id);
            if(user !== null) {
                Message.find({
                    $and: [{$or: [{userA: user._id}, {userB: user._id}]},
                        {$or: [{userA: req.params.user_id}, {userB: req.params.user_id}]}]
                }, function (err, messages) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.json(messages);
                        Message.updateMany({
                                $and: [{userB: user._id},{userA: req.params.user_id}]
                            },
                            {$set: {read: true}},
                            function (err) {
                                if (err)
                                    res.send(err);
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

exports.refreshConversations = function(req, res) {
    User.findOne({'_id': req.params.user_id}, function (err, user) {
        if (user != null) {
            if (err) return res.send(500, err.message);
            user.password = "";
            res.json({
                user: user,
                success: true,
                token: service.createToken(user)
            });
            Message.updateMany({
                    $and: [{userB: user._id},{userA: req.params.user_id}]
                },
                {$set: {delivered: true}},
                function (err) {
                    if (err)
                        res.send(err);
                });
        }
        else {
            res.json({success: false, message: 'Error en el usuario'});
            console.log("Error en el usuario");
        }
    });
};

/** FUNCIÓN NO NECESARIA **/

exports.markRead = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) return res.send(500, err.message);
        else {
            Message.updateMany({
                    $and: [{userB: user._id},{userA: req.params.user_id}]
                },
                {$set: {read: true}},
                function (err) {
                    if (err)
                        res.send(err);
                    Message.find(function (err, messages) {
                        if (err)
                            res.send(err);
                        res.json(messages);
                    });
                });
        }
    });
};

