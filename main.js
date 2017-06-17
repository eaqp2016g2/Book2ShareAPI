var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var app = express();
var app2 = express();
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

require('./config/routes.js')(app);

app2.use(express.static(__dirname + '/www'));

// PASSPORT

app2.use(passport.initialize());
app2.use(passport.session());

/* FACEBOOK */

var router2 = express.Router();
app2.use('/auth', router2);

var passportController = require('./controllers/passportCtrl');

router2.route('/facebook')
    .get(passportController.getFacebookAuth);

router2.route('/facebook/callback')
    .get(passportController.getFacebookCallback);

mongoose.connect('mongodb://localhost:27017/book2share', (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a la base de datos establecida...');
    app.listen(3001, function () {
        console.log('listening on port 3001');
    });

    /**** OAuth DISABLED ***/

    var oauth = false;
    if (oauth) {
        app2.listen(8000, function () {
            console.log('listening on port 8000');
        });
    }
});
