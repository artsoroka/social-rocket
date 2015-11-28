var router  = require('express').Router(); 
var Promise = require('bluebird'); 
var config  = require('../config'); 
var vk      = require('./lib/vk'); 
var db      = require('./lib/db'); 

var authRequired = function(req,res,next){
    if(! req.session.user ) 
        return res.send('you should login first'); 
    next(); 
}; 

var getAccessToken = function(json){
    console.log('response from vk', json); 
    return new Promise(function(resolve, reject){
        if( ! json.access_token ) 
            return reject('vk oauth response does not contain access token'); 
            
        if( ! json.user_id ) 
            return reject('vk oauth response does not contain user id'); 
            
        resolve({
            token : json.access_token, 
            userId: json.user_id
        }); 
            
    }); 
}; 

var createNewOauthUser = function(user){
    return new Promise(function(resolve, reject){
        db.transaction(function(transaction){
            return  db.insert({
                name: 'vkuser'
            })
            .returning('id')
            .into('users')
            .then(function (id) {
                                
                db.insert({
                    user_id: id, 
                    provider_id: 1, 
                    oauth_id: user.oauth.userId
                })
                .into('oauth_users') 
                .then(function(){
                                    
                    resolve({
                        id: id
                    }); 
                                    
                }); 
                                
            });
            
        });
        
    }); 
}; 

var authorizeUser = function(settings){
    return function(vkResponse){
        return new Promise(function(resolve, reject){
            console.log('got vkResponse', vkResponse); 
            
            db('oauth_users')
                .where({
                    oauth_id: vkResponse.userId, 
                    provider_id: 1
                })
                .select(['user_id'])
                .then(function(record){
                    console.log('select', record); 
                    if( record != false && record.length ) {
                        console.log('auth success: user found'); 
                        return resolve({
                            userId: record[0].user_id,
                            vkUserId: vkResponse.userId, 
                            token : vkResponse.token
                        }); 
                    }
                    
                    if( ! settings.createIfMissing ) 
                            return reject('user not found'); 
                     
                    console.log('user does not exist. Will create new');  
                    
                    createNewOauthUser({
                        oauth: {
                            userId: vkResponse.userId
                        }
                    }).then(function(user){
                        resolve({
                            userId  : user.id, 
                            vkUserId: vkResponse.userId, 
                            token   : vkResponse.token
                        });
                    }); 
                    
                })
                .catch(function(e){
                    console.log('db error', e); 
                    reject(e); 
                }); 
                
        }); 
    }; 
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
    
    vk
        .authorize(code)
        .then(getAccessToken)
        .then(authorizeUser({
            createIfMissing: true
        }))
        .then(function(session){
            req.session.user = session; 
            res.render('auth/oauth', {status: JSON.stringify({done: true})});
        })
        .catch(function(err){
            console.log('VK ERROR: ', err);  
            res.render('auth/oauth', {status: JSON.stringify({error: err})});  
        }); 
        
 });

module.exports = router; 