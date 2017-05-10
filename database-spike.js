const environment   = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database      = require('knex')(configuration)

database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['bananas', 35])
.then(() => {
database.raw('SELECT * FROM foods').then((data) => {
  console.log(data.rows[0])
  process.exit()
  });
});