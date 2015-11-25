var express    = require('express'); 
var bodyParser = require('body-parser'); 
var app        = express(); 
var session    = require('./lib/session'); 
var routes     = require('./routes'); 

app.use(session); 

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.json()); 

app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views'); 

app.use(routes); 

module.exports = app; 