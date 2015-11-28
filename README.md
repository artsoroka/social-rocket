# Social Rocket App 

### Installation 

Clone repostory and install dependencies 
```
$ git clone https://github.com/artsoroka/social-rocket
$ cd social-rocket 
$ npm intall 
```

Update ```config/index.js``` or set your environment variables with ```.env``` file 
* SR_APP_PORT=8080
* SR_VK_CLIENT_ID=12345
* SR_VK_CLIENT_SECRET=yoursecretkey 
* SR_DB_USER=dbadmin
* SR_DB_PSWD=dbpassword 
* SR_DB_NAME=socialrocket 
* SR_DB_PORT=3306

### Running migrations 

Create new database, export DB related variables or update config file and run migrations

```
$ knex --cwd ./db migrate:latest 
$ knex --cwd ./db seed:run
```

### Fire up your server 

Run ```$ node server.js ``` 

Or if you have [PM2](https://github.com/Unitech/pm2) installed run 

```$ pm2 start --name socila-rocket server.js ``` 

### Debug tips 

Sometimes it is useful to check Knex step by step log

Export ```DEBUG=knex:tx``` to your environment variables 