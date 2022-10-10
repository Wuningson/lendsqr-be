import db from './knex';

db.schema.createTable('user', function (table) {
    table.increments('user_id').primary();
    table.string('first_name', 100)
    table.string('last_name', 100)
    table.string('username', 100)
    table.string('email', 30)
    table.float('balance')
});

db.schema.createTable('transaction', function (table) {
    table.increments('transaction_id').primary();
    table.string('transaction_type', 100)
    table.integer('user_id').unsigned()
    table.string('username', 100)
    table.string('email', 30)
    table.foreign('user_id').references('user.user_id').deferrable('deferred')
});

db.schema.createTable('', function (table) {
    table.increments('id').primary();
    table.string('first_name', 100)
    table.string('last_name', 100)
    table.string('username', 100)
    table.string('email', 30)
});

export default db;