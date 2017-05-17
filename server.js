const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const FoodsController = require('./lib/controllers/foods-controller');
const DiaryController = require('./lib/controllers/diary-controller')
const cors = require('cors');


app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);
app.locals.title = "Quantified Self"


app.get('/', (request, response)  => {
  response.send(app.locals.title)
});

// for foods
app.get('/api/foods/:id', FoodsController.show)
app.get('/api/foods', FoodsController.index)
app.post('/api/foods', FoodsController.create)
app.put('/api/foods/:id', FoodsController.update)
app.delete('/api/foods/:id', FoodsController.destroy)

// for diary
app.get('/api/diary/:id', DiaryController.show)
app.get('/api/diary', DiaryController.index)
app.post('/api/diary', DiaryController.create)
app.put('/api/diary/:id', DiaryController.update)
// app.get('/api/diary/:id', DiaryController.destroy)


if(!module.parent){
  app.listen(app.get('port'), () => {
    console.log(app.locals.title + ' is running on ' + app.get('port'))
  });
};

module.exports = app;
