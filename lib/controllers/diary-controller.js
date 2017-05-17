const Diary = require('../models/diary')

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
    if(diary == null){
      response.sendStatus(404)
    } else {
      response.json(diary)
    };
  });
};

function create (request, response) {
  let food_name = request.body.food_name
  let meal_name = request.body.meal_name
  let date    = request.body.date

  if(!food_name) {
    response.status(422).send({
      error: 'No food_name property provided'
    })
  } else if (!meal_name) {
      response.status(422).send({
        error: 'No meal_id property provided'
      })
  } else if (!date) {
      response.status(422).send({
        error: 'No date property provided'
      })
  } else {
    Diary.create(food_name, meal_name, date).then((data) => {
      response.status(201).json(data);
      console.log("Sucessfully Created Diary Entry");
    })
    }
  };

function update (request, response){
  Diary.find(request.params.id)
  .then((data) => {
    let food_name = request.body.food_name
    let meal_name = request.body.meal_name
    let date      = request.body.date

    Diary.update(food_name, meal_name, date).then((data) => {
      response.status(201).json(data)
      console.log("Sucessfully Created Diary Entry");
    });
  });
};

function destroy (request, response) {
  Diary.find(request.params.id)
  .then((data) => {
    let diary = data.rows[0]

    if (!diary) {
      return response.sendStatus(404)
    } else {
      console.log("Sucessfully Deleted Diary Entry");
      Diary.destroy(diary.id).then(response.sendStatus(204));
    };
  });
};

module.exports = {
  index: index,
  show: show,
  create: create,
  destroy: destroy,
  update: update
};
