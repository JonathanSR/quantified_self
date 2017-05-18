const environment   = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database      = require('knex')(configuration)

function find (id) {
  return database.raw('SELECT * FROM foods WHERE id = ? LIMIT 1', [id])
};

function all() {
  return database.raw('SELECT * FROM foods')
};

function create (food_name, calories) {
  return database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?) RETURNING id',
  [food_name, calories])
  .then((data) => {
    const id = data.rows[0]['id']
    return find(id)
  });
};

function destroy(id){
  return database.raw('DELETE FROM foods WHERE id = ?', [id])
};

function update(food_name, calories, id){
  return database.raw('UPDATE foods SET food_name=?, calories=? WHERE id =? RETURNING *', [food_name, calories, id])
};

function destroyAll () {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
};


module.exports = {
  find: find,
  all: all,
  create: create,
  destroyAll: destroyAll,
  destroy: destroy,
  update: update
};
