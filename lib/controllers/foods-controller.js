const Food = require('../models/food')

function show (request, response) {
  Food.find(request.params.id)
  .then((data) => {
    let food = data.rows[0]

    if(food == null){
      response.sendStatus(404)
    } else {
      response.json(food)
    };
  });
};

function index (request, response) {
  Food.all()
  .then((data) => {
    let food = data.rows

    if(food == null){
      response.sendStatus(404)
    } else {
      response.json(food)
    };
  });
};


function create (request, response) {
  let name = request.body.food_name
  let calories = request.body.calories

  if(!name) {
    response.status(422).send({
      error: 'No name property provided'
    }); 
    } else if (!calories) {
      response.status(422).send({
        error: 'No calories property provided'
      }); 
    } else {
      Food.create(name, calories).then((data) => {
        response.status(201).json(data)
      });
    };
  };

function destroy (request, response){
  Food.find(request.params.id)
  .then((data) => {
    let food = data.rows[0]

    if(!food) { 
      return response.sendStatus(404)
    } else {
      Food.destroy(food.id)
      .then(response.sendStatus(204));
    };
  });
};

function update (request, response){
  Food.find(request.params.id)
  .then((data) => {
    let food = data.rows[0]
    let name = request.body.food_name
    let calories = request.body.calories

    Food.update(name, calories, food.id).then((data) => {
      response.status(201).json(data)
    });
  });
};

module.exports = {
  show: show,
  index: index,
  create: create,
  destroy: destroy,
  update: update
};