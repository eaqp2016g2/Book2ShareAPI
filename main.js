 var express  = require('express');
var app      = express();                     // Utilizamos express
var mongoose = require('mongoose');
const bodyParser = require('body-parser')
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

// Cargamos los endpoints
require('./app/routes')(app);

mongoose.connect('mongodb://localhost:27017/minimo',(err, res) =>{
	if (err) {
  return console.log(`Error al conectar a la base de datos: ${err}`)
}
	console.log('Conexion a la base de datos establecida...')
	app.listen(3001, function () {
	console.log('listening on port 3001');
	});
})
