/**
 * Created by juan on 17/03/17.
 */

var user = require('../models/userModel');



exports.register = function (req, res) {
    user.create({name:req.body.name, email:req.body.email, password:req.body.password, avatar:'imagen.png'},
    function(err, user){
        if (err)
        res.send(err);
        user.find(function(err,user){
            if (err)
            res.send(err)
            res.json(user);
        });
    });
    
}