const Diary = require('../models/diary')


// let DiaryController = {
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

function index (request, response) {
  Diary.all()
  .then ((data) => {
    let diary = data.rows

    if (diary == null) {
      response.sendStatus(404)
    } else {
      response.json(diary)
    };
  })
};

function show (request, response) {
  Diary.find(request.params.id)
  .then((data) => {
    let diary = data.rows
    console.log(diary)

    if(diary == null){
      response.sendStatus(404)
    } else {
      response.json(diary)
    };
  });
};

function create (request, response) {
  let food_id = request.body.food_id
  let meal_id = request.body.meal_id
  let date    = request.body.date

  if(!food_id) {
    response.status(422).send({
      error: 'No food_id property provided'
    })
  } else if (!meal_id) {
      response.status(422).send({
        error: 'No meal_id property provided'
      })
  } else if (!date) {
      response.status(422).send({
        error: 'No date property provided'
      })
  } else {
    Diary.create(food_id, meal_id, date).then((data) => {
      response.status(201).json(data);
      console.log("Sucessfully Created Diary Entry");
    })
    }
  };


//---------------------------------------------------
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
function update (request, response){
  Diary.find(request.params.id)
  .then((data) => {
    let food = data.rows[0]
    let food_id = request.body.food_food_id
    let meal_id = request.body.meal_id

    Diary.update(food_id, meal_id, date).then((data) => {
      response.status(201).json(data)
    });
  });
};

module.exports = {
  index: index,
  show: show,
  create: create,
  // destroy: destroy,
  update: update
};
