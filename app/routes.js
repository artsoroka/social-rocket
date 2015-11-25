var router = require('express').Router(); 
var config = require('../config'); 
var vk     = require('./lib/vk'); 

var authRequired = function(req,res,next){
    if(! req.session.user ) 
        return res.send('you should login first'); 
    next(); 
}; 

router.get('/', function(req,res){
    res.render('index', {
        title: 'Social Rocket', 
        message: 'Welcome to Social Rocket', 
        vkSettings: JSON.stringify({
           client_id     : config.VK.client_id,   
           redirect_uri  : config.App.base_url + config.VK.redirect_uri, 
           scope         : config.VK.scope,  
           v             : config.VK.api_version, 
           display       : 'popup', 
           response_type : 'code' 
        }) 
    }); 
}); 

router.get('/home', authRequired, function(req,res){
    res.render('home', {
        title: 'Social Rocket Home', 
        message: 'Welcome to Social Rocket Home'
    }); 
}); 


router.get('/auth/vk', function(req,res){
    
    var error    = req.query.error || null; 
    var errDescr = req.query.error_description || null; 
    var code     = req.query.code || null; 
    
    if( error ){
        console.log(error, errDescr); 
        var status = JSON.stringify({
                error: error, 
                text: errDescr
            }); 
        return res.render('auth/oauth', {status: status}); 
    }
    if( ! code ){
        console.log('got response from oauth provider without code'); 
        var status = JSON.stringify({
                error: 'invalid oauth response', 
                text: 'your oauth provider sucks' 
            }); 
        return res.render('auth/oauth', {status: status}); 
    } 
    
    vk.authorize(code).then(function(response){
        console.log(response); 
            
        req.session.user = {name: 'Vasya'};
        res.render('auth/oauth', {status: JSON.stringify({done: true})}); 
         
    }).catch(function(e){
        console.log('VK ERROR: ', e); 
        res.render('auth/oauth', {status: JSON.stringify({error: e})})
    }); 
    
});

module.exports = router; 