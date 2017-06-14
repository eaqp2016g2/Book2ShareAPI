/**
 * Created by juan on 14/06/17.
 */

var passport = require('passport');

exports.getFacebookCallback = function () {
    passport.authenticate('facebook', {
        successRedirect: '/#!/library',
        failureRedirect: '/'
    });
};

exports.getFacebookAuth = function () {
    passport.authenticate('facebook', { scope: 'email' })
};