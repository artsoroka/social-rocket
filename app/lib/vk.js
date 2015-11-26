var Promise = require('bluebird'); 
var request = require('request'); 
var qs      = require('querystring'); 
var config  = require('../../config'); 

var VK = function(config){
    this.client_id    = config.client_id; 
    this.secret       = config.secret; 
    this.callback_url = config.callback_url; 
    this.url          = 'https://oauth.vk.com/access_token'; 
}; 

VK.prototype.authorize = function(code){
    var query = qs.stringify({
        client_id: this.client_id, 
        client_secret: this.secret, 
        redirect_uri: this.callback_url,
        code: code
    }); 
    var url = [this.url, query].join('?'); 
    
    return new Promise(function(resolve, reject){
        request.get(url, function(err, response, body){
            if( err ) return reject( err ); 
            
            if( response.statusCode != 200 ) 
                return reject('response code is not 200 OK', response); 
            
            var data = null; 
            try{
                data = JSON.parse(body); 
            } catch(e){
                console.log(e); 
            }
            
            if( ! data ) reject('invalid response', body); 
            
            if( data.error ) 
                return reject('got response with error', data.error); 
                
            resolve(data); 
                
        }); 
    }); 
}; 

module.exports = new VK({
    client_id   : config.VK.client_id, 
    secret      : config.VK.client_secret, 
    callback_url: config.App.base_url + config.VK.redirect_uri
});