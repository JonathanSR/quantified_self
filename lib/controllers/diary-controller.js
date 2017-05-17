const Diary = require('../models/diary')


// const DiaryController = {
//   show : function () {
//     Diary.find(request.params.id).then(data) => {let food = data.rows[0]}
//   },
//   create : function () {
//
//   },
//   update : function () {
//
//   },
//   destroy : function () {
//
//   }
// };
//
// module.exposts = DiaryController


function show (request, response) {
  Diary.find(request.params.id)
  .then((data) => {
    let diary = data.rows
    console.log(diary)

    // if(diary == null){
    //   response.sendStatus(404)
    // } else {
      response.json(diary)
    //};
  });
};


// function create (request, response) {
//   let name = request.body.food_id
//   let calories = request.body.meal_id
//
//   if(!name) {
//     response.status(422).send({
//       error: 'No name property provided'
//     });
//     } else if (!calories) {
//       response.status(422).send({
//         error: 'No calories property provided'
//       });
//     } else {
//       Diary.create(name, calories).then((data) => {
//         response.status(201).json(data)
//       });
//     };
//   };
//
// function destroy (request, response){
//   Diary.find(request.params.id)
//   .then((data) => {
//     let food = data.rows[0]
//
//     if(!food) {
//       return response.sendStatus(404)
//     } else {
//       Diary.destroy(food.id)
//       .then(response.sendStatus(204));
//     };
//   });
// };
//
// function update (request, response){
//   Diary.find(request.params.id)
//   .then((data) => {
//     let food = data.rows[0]
//     let name = request.body.food_name
//     let calories = request.body.calories
//
//     Diary.update(name, calories, food.id).then((data) => {
//       response.status(201).json(data)
//     });
//   });
// };

module.exports = {
  show: show,
  // create: create,
  // destroy: destroy,
  // update: update
};
