exports.up = function(knex) {
  return knex.schema.createTable('keeper', function(table){
    table.increments().primary();
    table.string('title', 120);
    table.text('note');
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('keeper')
};
