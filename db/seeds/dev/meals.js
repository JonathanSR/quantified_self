exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  .then(() => {
    return Promise.all ([
      knex.raw (
        'INSERT INTO meals (meal_name) VALUES (?)',
        ["Breakfast"]),
      knex.raw (
        'INSERT INTO meals (meal_name) VALUES (?)',
        ["Lunch"]
      ),
      knex.raw (
        'INSERT INTO meals (meal_name) VALUES (?)',
        ["Dinner"]
      ),
      knex.raw (
        'INSERT INTO meals (meal_name3) VALUES (?)',
        ["Snack"]
      )
    ]);
  });
};
