exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('oauth_providers').del(), 
    knex('oauth_providers').insert({title: 'VK'}), 
    knex('oauth_providers').insert({title: 'INSTAGRAM'}),
    knex('oauth_providers').insert({title: 'FB'}), 
    
    knex('users').del(), 
    knex('users').insert({name: 'admin', email: 'admin@socialrocket.com', password: 'admin'}),
    knex('users').insert({email: 'vkuser@vk.com'}), 
    
    knex('oauth_users').del(),
    knex('oauth_users').insert({user_id: 2, provider_id: 1, oauth_id: 123})
    
  );
};