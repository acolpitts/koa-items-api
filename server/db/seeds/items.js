
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, title: 'item 1', column: 0},
        {id: 2, title: 'item 2', column: 0},
        {id: 3, title: 'item 3', column: 0},
        {id: 4, title: 'item 4', column: 1},
        {id: 5, title: 'item 5', column: 1}
      ]);
    });
};
