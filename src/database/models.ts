// import db from './db.init';

// db.schema.createTable('user', function (table) {
//     table.increments('user_id').primary();
//     table.string('first_name', 100)
//     table.string('last_name', 100)
//     table.string('username', 100)
//     table.string('email', 30)
//     table.float('balance')
// });

// db.schema.createTable('transaction', function (table) {
//     table.increments('transaction_id').primary();
//     table.string('transaction_type', 100) // transfer, deposit, withdrawal
//     table.float('amount')
//     table.foreign('user_id').references('user.user_id').deferrable('deferred')
// });

// db.schema.createTable('transfer', function (table) {
//     table.primary(['sender_id', 'transaction_id']) // composite table
//     table.foreign('receiver_id').references('user.user_id')
//     table.float('amount')
// });

// export default db;