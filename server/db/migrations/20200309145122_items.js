exports.up = function(knex, Promise) {
  return knex.schema.createTable("items", table => {
    table.increments();
    table
      .string("title")
      .notNullable();
    table
      .integer("column")
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("items");
};