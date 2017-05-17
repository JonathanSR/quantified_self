const environment     = process.env.NODE_ENV || 'development'
const configuration   = require('../../knexfile')[environment]
const database        = require('knex')(configuration)

 let Diary = {
  all  : function () {
    return database.raw('SELECT foods.food_name, foods.calories, meals.meal_name, food_meals.date FROM foods INNER JOIN food_meals ON foods.id=food_meals.food_id INNER JOIN meals ON food_meals.meal_id=meals.id')
    //'SELECT * FROM food_meals'
  },
  find : function(id) {
    // go back fix this sql query and make a joins table
    return database.raw('SELECT * FROM food_meals WHERE id = (?) LIMIT 1', [id])
  },
  create : function(meal_id, food_id, date) {
    return database.raw('INSERT INTO food_meals (food_id, meal_id, date) VALUES (food_id, meal_id, date) RETURNING id')
      .then((data) => {
        const id = data.rows[0]['id']
        return find(id)
    });
  },
  update : function(food_id, meal_id, date) {
    return database.raw('UPDATE food_meals SET food_id=food_id, meal_id=meal_id, date=date RETURNING *')
  }
  // destroy : function(id) {
  //
  // }
};

module.exports = Diary;
//---------------------------------------------

//
// function destroy(id){
//   return database.raw('DELETE FROM food_meals WHERE id = ?', [id])
// };
//
// function update(food_id, meal_id, id){
//   return database.raw('UPDATE food_meals SET food_name=?, calories=? WHERE id =? RETURNING *', [food_name, calories, id])
// };
