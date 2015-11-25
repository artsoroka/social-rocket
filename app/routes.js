var router = require('express').Router(); 
var config = require('../config'); 

router.get('/', function(req,res){
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

router.get('/home', function(req,res){
    res.render('home', {
        title: 'Social Rocket Home', 
        message: 'Welcome to Social Rocket Home'
    }); 
}); 

module.exports = router; 