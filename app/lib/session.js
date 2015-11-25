var session   = require('express-session'); 
var config    = require('../../config'); 
var extend    = require('util')._extend; 
var FileStore = require('session-file-store')(session);

extend(config.session, {
    store: new FileStore({
        path: config.App.sessions
    })
}); 

module.exports = session(config.session); 