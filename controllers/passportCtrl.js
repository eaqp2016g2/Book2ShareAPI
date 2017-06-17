/**
 * Created by juan on 14/06/17.
 */

var passport = require('passport');

exports.getFacebookCallback = function () {
    passport.authenticate('facebook', {
        successRedirect: '#!/portal',
        failureRedirect: '/'
    });
};

exports.getFacebookAuth = function () {
    console.log("Intento de autentificación");
    passport.authenticate('facebook', { scope: 'email' })
};