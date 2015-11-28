exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table){
            table.charset('utf8'); 
            table.collate('utf8_unicode_ci'); 

            table.increments(); 
            table.string('name', 50);
            table.string('email', 100); 
            table.string('password');
            table.timestamp("created_at").defaultTo(knex.raw('now()')); 
            table.timestamp("updated_at"); 
        }), 
        
        knex.schema.createTable('oauth_providers', function(table){
            table.charset('utf8'); 
            table.collate('utf8_unicode_ci'); 

            table.increments(); 
            table.string('title', 50);
        }), 
        
        knex.schema.createTable('oauth_users', function(table){
            table.charset('utf8'); 
            table.collate('utf8_unicode_ci'); 

            table.increments(); 
            table.integer('user_id').unsigned().index().references('id').inTable('users'); 
            table.integer('provider_id').unsigned().index().references('id').inTable('oauth_providers'); 
            table.integer('oauth_id');
            table.timestamp("created_at").defaultTo(knex.raw('now()')); 
            table.timestamp("updated_at"); 
        }) 
        
    ]);
};

exports.down = function(knex, Promise) {
  knex.schema
    .dropTableIfExists('oauth_users')
    .dropTableIfExists('oauth_providers')
    .dropTableIfExists('users'); 
    
};
