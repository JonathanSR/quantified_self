
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE food_meals(id SERIAL PRIMARY KEY NOT NULL, food_id integer REFERENCES foods(id), meal_id integer REFERENCES meals(id), date DATE)`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE meals`;
  return knex.raw(dropQuery);
};
