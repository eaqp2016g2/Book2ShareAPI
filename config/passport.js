/*
 * Define passport strategies, i.e. what to do with the credentials
 * provided by the OAuth provider
 */
const User = require('models/userModel');
const service = require('services/service');

const FacebookStrategy = require('passport-facebook').Strategy;

// load our auth.js config parameters

//const configAuth = require('config/auth');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    //FACEBOOK STRATEGY

    /*passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: configAuth.facebookAuth.profileFields

        },
        myFacebookStrategy)
    );*/
};

function myFacebookStrategy(token, refreshToken, profile, done) {
        console.log("facebook");
        User.findOne({ email: profile.emails[0].value }, function (err, user) {
            if (err) {
                throw(err)
            } else if (user!== null) {
                console.log("User already exists in database, proceed to login");
                return done(null, user);
            }
            console.log("User doesn't exists, proceed to save");
            var userface = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                admin: false //set it to true if you want to create an admin user
            });

            userface.save(function (err) {
                if (err){
                    throw err;
                }
                done(null, user);
            });
        });
}
