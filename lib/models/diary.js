const environment     = process.env.NODE_ENV || 'development'
const configuration   = require('../../knexfile')[environment]
const database        = require('knex')(configuration)

 let Diary = {
  all  : function () {
    return database.raw('SELECT foods.food_name, foods.calories, meals.meal_name, food_meals.date, food_meals.id FROM foods INNER JOIN food_meals ON foods.id=food_meals.food_id INNER JOIN meals ON food_meals.meal_id=meals.id')
  },
  find : function(id) {
    return database.raw(`SELECT foods.food_name, foods.calories, meals.meal_name, food_meals.date, food_meals.id FROM foods INNER JOIN food_meals ON foods.id=food_meals.food_id INNER JOIN meals ON food_meals.meal_id=meals.id WHERE food_meals.id = ${id} LIMIT 1`)
  },
  //---------------------------------------------------------------
  create : function(food_name, meal_name, date) {
    return database.raw(`SELECT food.id FROM foods WHERE foods.food_name = ${food_name}`)
      .then((data) => {
        let food_id = data.rows
      });
    return database.raw(`SELECT meal.id FROM meals WHERE meals.meal_name = ${meal_name}`)
      .then((data) => {
        let meal_id = data.rows
      });
    return database.raw(`INSERT INTO food_meals (${food_id}, ${meal_id}, ${date}) VALUES (food_id, meal_id, date) RETURNING id`)
      .then((data) => {
        const id = data.rows['id']
        return find(id)
    });
    //------------------------------------------------------------
  },
  update : function(food_id, meal_id, date) {
    return database.raw('UPDATE food_meals SET food_id=food_id, meal_id=meal_id, date=date RETURNING *')
  },
  destroy : function(id) {
    return database.raw(`DELETE FROM food_meals WHERE id = ${id}`)
  }
};

module.exports = Diary;
