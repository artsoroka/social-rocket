var express    = require('express'); 
var bodyParser = require('body-parser'); 
var app        = express(); 
var config     = require('../config'); 

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.json()); 

app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views'); 

app.get('/', function(req,res){
    res.render('index', {
        title: 'Social Rocket', 
        message: 'Welcome to Social Rocket', 
        vkSettings: JSON.stringify({
           client_id     : config.VK.client_id,   
           redirect_uri  : config.VK.redirect_uri, 
           scope         : config.VK.scope,  
           v             : config.VK.api_version, 
           display       : 'popup', 
           response_type : 'code' 
        }) 
    }); 
}); 

app.get('/home', function(req,res){
    res.render('home', {
        title: 'Social Rocket Home', 
        message: 'Welcome to Social Rocket Home'
    }); 
});

module.exports = app; 