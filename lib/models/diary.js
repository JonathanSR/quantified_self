const environment     = process.env.NODE_ENV || 'development'
const configuration   = require('../../knexfile')[environment]
const database        = require('knex')(configuration)

// function Diary () {
//   find : function(id) {
//     return database.raw('select * from food-meals where id = id')
//   },
//   create : function(meal_id, food_id) {
//
//   },
//   update : function(meal_id, food_id) {
//
//   },
//   destroy : function(id) {
//
//   }
// };
//
// module.exports = Diary;

function find (id) {

  return database.raw('SELECT * FROM food_meals WHERE id = ?', [id])
};

function create (meal_id, food_id) {
  return database.raw('INSERT INTO food_meals (food_name, calories) VALUES (?, ?) RETURNING id',
  [food_name, calories])
  .then((data) => {
    const id = data.rows[0]['id']
    return find(id)
  });
};

function destroy(id){
  return database.raw('DELETE FROM food_meals WHERE id = ?', [id])
};

function update(food_id, meal_id, id){
  return database.raw('UPDATE food_meals SET food_name=?, calories=? WHERE id =? RETURNING *', [food_name, calories, id])
};

module.exports = {
  find: find,
  create: create,
  destroy: destroy,
  update: update
};
