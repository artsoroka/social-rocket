require('dotenv').load();

var app      = require('./app/app.js'); 
var server   = require('http').Server(app); 
var config   = require('./config'); 
var listener = server.listen(config.App.port); 

console.log('Social Rocket app started on port ', listener.address().port); 