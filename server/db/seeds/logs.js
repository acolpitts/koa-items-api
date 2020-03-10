exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('logs').del()
    .then(function () {
      // Inserts seed entries
      return knex('logs').insert([
        {id: 1, type: 'POST', path:'/api/v1/items/1', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 2, type: 'POST', path:'/api/v1/items/2', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 3, type: 'POST', path:'/api/v1/items/3', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 4, type: 'POST', path:'/api/v1/items/4', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 5, type: 'POST', path:'/api/v1/items/5', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 6, type: 'POST', path:'/api/v1/items/6', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 7, type: 'POST', path:'/api/v1/items/7', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 8, type: 'POST', path:'/api/v1/items/8', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 9, type: 'POST', path:'/api/v1/items/9', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 10, type: 'POST', path:'/api/v1/items/10', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 11, type: 'DELETE', path:'/api/v1/items/11', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 12, type: 'DELETE', path:'/api/v1/items/12', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 13, type: 'DELETE', path:'/api/v1/items/13', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 14, type: 'DELETE', path:'/api/v1/items/14', ip:'127.0.0.1', agent: 'mocha/knex'},
        {id: 15, type: 'DELETE', path:'/api/v1/items/15', ip:'127.0.0.1', agent: 'mocha/knex'}
      ]);
    });
};
