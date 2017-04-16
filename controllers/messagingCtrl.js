/**
 * Created by juan on 14/04/17.
 */

var messagingModel = require('../models/messagingModel');

exports.sendMessage = function (req, res) {
    userModel.findOne({'tokens.token': req.headers['x-access-token']}, function (err, userA) {
        if (err) return res.send(500, err.message);
        if (!userA) {
            res.json({success: false, message: 'Usuari origen no trobat'});
        } else if (userA) {
            userModel.findOne({_id: req.body.userB}, function (err, userB) {
                if (err) return res.send(500, err.message);
                if (!userB) {
                    res.json({success: false, message: 'Usuari destí no trobat'});
                } else if (userB) {
                    messagingModel.create(
                        {
                            userA: userA._id, userB: userB._id, content: req.body.content,
                            date: Date(), read: false, delivered: false
                        },
                        function (err) {
                            if (err)
                                res.send(err);
                            messagingModel.find(function (err, message) {
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

exports.getMessagesByUser = function (req, res){

};

exports.markRead = function (req, res){
    messagingModel.update( {_id : req.params.message_id},
        {$set:{read : true}},
        function(err) {
            if (err)
                res.send(err);
            messagingModel.find(function(err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        });
};

