exports.up = function(knex, Promise) {
  return knex.schema.createTable("logs", table => {
    table.increments();
    table
      .string("type")
      .notNullable();
    table
      .string("path")
      .notNullable();
    table
      .string("ip")
      .notNullable();
    table
      .string("agent")
      .notNullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("logs");
};