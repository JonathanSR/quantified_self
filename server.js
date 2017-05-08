const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const FoodsController = require('./lib/controllers/foods-controller');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);
app.locals.title = "Quantified Self"

app.locals.food = {
  wow: "Banana"
};

app.get('/', (request, response)  => {
  response.send('Welcome to Quantified Self.')
});


app.get('/api/foods/:id', FoodsController.show)

// app.post('/api/foods/', function(request, response){
//   var message = request.body;
//   var id = message

//   if(!message){
//     return response.status(422).send({
//       error: 'No message property provided'
//     })
//   }
//   response.status(201).json({id, message});
// });

// app.delete('/api/food/:id', function(request, response){
//   var id = request.params.id;
//   var message = app.locals.food[i];


// //some method to delete
//   if(!//something//){return response. sendStatus(404)};
// })


if(!module.parent){
  app.listen(app.get('port'), () => {
    console.log(app.locals.title + ' is running on ' + app.get('port'))
  });
};

module.exports = app;