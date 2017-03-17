var express = require('express');
var bodyParser = require('body-parser');

var userModel = require('./models/userModel');
var userController = require('./controllers/userController');
var bookModel = require('./models/bookModel');

var app      = express();                     // Utilizamos express
var mongoose = require('mongoose');
var http = require('http');
var server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/angular'));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

require('./config/routes.js')(app);

mongoose.connect('mongodb://localhost:27017/book2share',(err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a la base de datos establecida...')
    app.listen(3001, function () {
        console.log('listening on port 3001');
    });
});
