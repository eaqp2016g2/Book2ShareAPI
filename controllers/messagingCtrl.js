/**
 * Created by juan on 14/04/17.
 */

var Message = require('../models/messagingModel');
var User = require('../models/userModel');

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

exports.getMessagesByUser = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) return res.send(500, err.message);
        else {
            Message.find({
                $and: [{$or: [{userA: user._id}, {userB: user._id}]},
                    {$or: [{userA: req.params.user_id}, {userB: req.params.user_id}]}]
            }, function (err, messages) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(messages);
                    Message.update({
                            $and: [{$or: [{userA: user._id}, {userB: user._id}]},
                                {$or: [{userA: req.params.user_id}, {userB: req.params.user_id}]}]
                        },
                        {$set: {delivered: true}},
                        function (err) {
                            if (err)
                                res.send(err);
                        });
                }
            });
        }
    });
};

exports.markRead = function (req, res) {
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) return res.send(500, err.message);
        else {
            Message.update({
                    $and: [{$or: [{userA: user._id}, {userB: user._id}]},
                        {$or: [{userA: req.params.user_id}, {userB: req.params.user_id}]}]
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

