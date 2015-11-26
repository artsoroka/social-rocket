module.exports = {
    App: {
        base_url: 'http://polygram-artsoroka1.c9.io', 
        port: 8080, 
        sessions: process.cwd() + '/app/sessions' 
    }, 
    db: {
	    user     : process.env.SR_DB_USER || 'dbadmin', 
	    password : process.env.SR_DB_PSWD, 
	    database : process.env.SR_DB_NAME || 'socialrocket', 
	    port	 : process.env.SR_DB_PORT || 3306
	}, 
    session: {
        name: 'socialrocket', 
        key:  'socialrocket', 
        resave: false, 
        saveUninitialized: false, 
        cookie: {
            httpOnly: false, 
            secure: false
        },
        secret: 'keyboard cat'
    }, 
    VK: {
        client_id    : process.env.SR_VK_CLIENT_ID,  
        client_secret: process.env.SR_VK_CLIENT_SECRET, 
       
        redirect_uri : '/auth/vk',   
        scope        : ['wall', 'groups', 'video', 'offline'],  
        api_version  : '5.40'
    }
}; 