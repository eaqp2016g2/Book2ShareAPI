/**
 * Created by juan on 14/04/17.
 */

var User = require('../models/userModel');

exports.deleteUserById = function (req, res) {
    User.remove({_id : req.params.user_id}, function(err, user) {
        if (err)
            res.send(err);
        Persona.find(function(err, user) {
            if (err)
                res.send(err)
            res.json(user);
        });
    });
};
