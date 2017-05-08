
exports.seed = function(knex, Promise) {
  //return knex.raw('TRUNCATE foods RESTART IDENTITY')
  return knex('foods').del()
  .then(() => {
    return Promise.all ([
      knex.raw (
        'INSERT INTO foods (food_name, calories) VALUES (?, ?)',
        ["French Silk Pie", 340]
      ),
      knex.raw (
        'INSERT INTO foods (food_name, calories) VALUES (?, ?)'
        ["Orange", 34]
      ),

      knex.raw (
        'INSERT INTO foods (food_name, calories) VALUES (?, ?)'
        ["Deep Dish Pizza", 890]
      ),

      knex.raw (
        'INSERT INTO foods (food_name, calories) VALUES (?, ?)'
        ["Spinach Salad w/ dressing", 240]
      ),

      knex.raw (
        'INSERT INTO foods (food_name, calories) VALUES (?, ?)'
        ["Roasted Cauliflower", 80]
      ),

      knex.raw (
        'INSERT INTO foods (food_name, calories) VALUES (?, ?)'
        ["Chicken Breast", 210]
      ),

      knex.raw (
        'INSERT INTO foods (food_name, calories) VALUES (?, ?)'
        ["Dark Chocolate", 150]
      ),

      knex.raw (
        'INSERT INTO foods (food_name, calories) VALUES (?, ?)'
        ["Beef Jerky", 95]
      ),

    ]);
  });
  // // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('table_name').insert([
  //       {id: 1, colName: 'rowValue1'},
  //       {id: 2, colName: 'rowValue2'},
  //       {id: 3, colName: 'rowValue3'}
  //     ]);
  //   });
};
