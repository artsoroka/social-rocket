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
        var url = this.generateUrl(); 
        console.log(url); 
        var loginWindow = window.open(url, "authentication", "width=800, height=450"); 
        var self = this; 
        var intervalId = setInterval(function() {
            
            if( loginWindow.closed ){
                clearInterval(intervalId);
                return; 
            }
            
            var status = self.getStatus(loginWindow); 
            if( ! status ) return; 
            
            if(status.error){
                console.log(status.error, status.text); 
                clearInterval(intervalId);
            }
            
            if (status.done) {
                clearInterval(intervalId);
                loginWindow.close(); 
                window.location = '/home';  
            }
            
        }, 1000);
        
    }, 
    getStatus: function(w){
       var status = null; 
       try {
           var doc = w.document; 
           status = JSON.parse(doc.getElementById('status').innerHTML); 
       } catch(e){
           console.log(e); 
       }
       
       return status; 
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
