module.exports = {
    App: {
        port: 8080
    }, 
    VK: {
        client_id    : process.env.SR_VK_CLIENT_ID,  
        client_secret: process.env.SR_VK_CLIENT_SECRET, 
       
        redirect_uri : 'http://yoursite.com',  
        scope        : ['wall', 'groups', 'video', 'offline'],  
        api_version  : '5.40'
    }
}; 