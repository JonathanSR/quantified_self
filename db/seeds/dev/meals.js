exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  .then(() => {
    return Promise.all ([
      knex.raw (
        'INSERT INTO foods (food_name) VALUES (?)',
        ["Breakfast"]),
      knex.raw (
        'INSERT INTO foods (food_name) VALUES (?)',
        ["Lunch"]
      ),
      knex.raw (
        'INSERT INTO foods (food_name) VALUES (?)',
        ["Dinner"]
      ),
      knex.raw (
        'INSERT INTO foods (food_name) VALUES (?)',
        ["Snack"]
      )
    ]);
  });
};
