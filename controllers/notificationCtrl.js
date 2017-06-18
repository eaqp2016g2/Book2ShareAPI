/**
 * Created by juan on 17/06/17.
 */

var User = require('../models/userModel');

exports.markRead = function (req, res) {

};

exports.colour = function (req, res) {

    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                User.update({_id: user._id},
                    {$set: {'settings.colour': {primario: req.body.primario, secundario: req.body.accent}}},
                    function (err, success) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send(success);
                        }
                    })
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });
};

exports.allowNotifications = function (req, res) {
    console.log(req.params.value);
    User.findOne({'tokens.token': req.headers['x-access-token']}, function (err, user) {
        if (err) {
            return res.send(500, err.message);
        }
        else {
            if (user !== null) {
                User.update({_id: user._id}, {$set: {settings: {allow_notifications: req.params.value}}}, function (err, success) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(success);
                    }
                })
            }
            else {
                return res.status(500).send("ID nula");
            }
        }
    });
};