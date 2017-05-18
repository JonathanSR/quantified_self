exports.seed = function(knex, Promise) {
  return knex('food_meals').then(() => {
    return Promise.all ([
      knex.raw(
        'insert into food_meals (food_id, meal_id, date) values (?, ?, ?)',
        [1, 1, "2017-05-15"]
      ),
      knex.raw(
        'insert into food_meals (food_id, meal_id, date) values (?, ?, ?)',
        [3, 1, "2017-05-15"]
      ),
      knex.raw(
        'insert into food_meals (food_id, meal_id, date) values (?, ?, ?)',
        [2, 2, "2017-05-15"]
      ),
      knex.raw(
        'insert into food_meals (food_id, meal_id, date) values (?, ?, ?)',
        [3, 2, "2017-05-15"]
      ),
      knex.raw(
        'insert into food_meals (food_id, meal_id, date) values (?, ?, ?)',
        [5, 3, "2017-05-15"]
      ),
      knex.raw(
        'insert into food_meals (food_id, meal_id, date) values (?, ?, ?)',
        [6, 3, "2017-05-15"]
      ),
      knex.raw(
        'insert into food_meals (food_id, meal_id, date) values (?, ?, ?)',
        [7, 4, "2017-05-15"]
      ),
      knex.raw(
        'insert into food_meals (food_id, meal_id, date) values (?, ?, ?)',
        [2, 4, "2017-05-15"]
      )
    ]);
  });
};
