/**
 * Created by juan on 17/03/17.
 */

var userModel = require('../models/userModel');

exports.register = function (req, res) {
    console.log(req.body);
    var user = new userModel({
        name: req.body.name,
        password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
        email: req.body.email,
        avatar: 'img/user.png',
        background: 'img/background.png'
    });

    /* end of notification*/
    user.save(function (err, user) {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        //res.status(200).jsonp(user); en comptes de retoranr la data del signup, fem el login directament
        console.log("signup fet correctament, redirigint al login internament automàtic");
        exports.login(req, res);
    });
};