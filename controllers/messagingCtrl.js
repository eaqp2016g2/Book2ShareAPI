/**
 * Created by juan on 14/04/17.
 */

var messagingModel = require('../models/messagingModel');

exports.sendMessage = function (req, res) {
    messagingModel.create(
        {userA : req.body.userA, userB: req.body.userB, content: req.body.content,
            date: req.body.date, read: false},
        function(err) {
            if (err)
                res.send(err);
            messagingModel.find(function(err, message) {
                if (err)
                    res.send(err);
                res.json(message);
            });
        });

}

exports.getMessagesByUser = function (req, res){

}

exports.markRead = function (req, res){

}

