var SR = {
    
    baseUrl: 'https://oauth.vk.com/authorize', 
    getConfig: function(){
       var config = null; 
       var data = document.getElementById('vkSettings'); 
       
       if( ! data ) return console.log('html element with vk settings not found'); 
       
       try{
           config = JSON.parse(data.innerHTML); 
       } catch(e){
           console.log('could not parse vk settings'); 
       }
       
       return config; 
       
    }, 
    login: function(){
        console.log(this.generateUrl()); 
        //var loginWindow = window.open(this.generateUrl(), "authentication", "width=800, height=450"); 
    }, 
    generateUrl: function(){
        var config = this.getConfig(); 
        var params = []; 
        
        if( ! config ) return; 
        
        for(var property in config){
            params.push( [property, config[property]].join('=') );
        }
        
        return [this.baseUrl, params.join('&')].join('?'); 
    }
}; 

window.onload = function(){
    document.getElementById('loginBtn').onclick = function(){
        SR.login();  
    }; 
}; 
