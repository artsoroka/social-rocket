console.log(process.cwd()); 
module.exports = {
    App: {
        port: 8080, 
        sessions: process.cwd() + '/app/sessions' 
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
       
        redirect_uri : 'http://polygram-artsoroka1.c9.io/auth/vk',   
        scope        : ['wall', 'groups', 'video', 'offline'],  
        api_version  : '5.40'
    }
}; 