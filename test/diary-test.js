const assert        = require('chai').assert;
const app           = require('../server');
const request       = require('request');

const environment   = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database      = require('knex')(configuration)

const Diary          = require('../lib/models/diary')


describe('Diary Api', () => {
  before(done => {
    this.port = 9876

    this.server = app.listen(this.port, (err, result) => {
      if(err) {return done(err) }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist',() => {
    assert(app);
  });

  describe('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) {done(error) }

        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the application', (done) => {
      var title = app.locals.title

      this.request.get('/', (error, response) => {
        if (error) { done(error) }

        assert(response.body.includes(title),
          `"${response.body}" does not include "${title}".`);
        done();
      });
    });
  });

  describe('GET /api/diary', () => {
    it ('return all items on the food_meals table', (done) => {
      this.request.get('/api/diary', (error, response) => {
        if(error) {done(error)}

        let parsed = JSON.parse(response.body)

        assert.equal(response.statusCode, 200)
        assert.equal(parsed.length, 6)
        done();
      });
    });
  });

  describe('GET /api/diary/:id', () => {
    xit('should have the id, name and calories from the resource', (done) => {
      this.request.get('/api/diary/104', (error, response) => {
        if(error) {done(error)}

        let date = 1
        let food_name = 'Black Coffee'
        let meal_name = 'Breakfast'

        let parsedDiary = JSON.parse(response.body)

        assert.equal(response.statusCode, 200)
        assert.equal(parsedDiary.date, date)
        assert.equal(parsedDiary.food_name, food_name)
        assert.equal(parsedDiary.meal_name, meal_name)

        done();
      });
    });
  });

  describe('POST /api/diary', () => {
    afterEach((done) =>{
      this.request.delete('/api/diary/1', (error, response) => {
        if(error) {done(error)}
        done()
      });
    });

    xit('should receive and store data', (done) => {
      var newFood ={
        food_name: 'Tacos',
        calories: 105
      };

      this.request.post('/api/diary',{form: newFood}, (error, response) =>{
        if (error) { done( error) }

        let date   = "2017-05-15"
        let food_name = 'Tacos'
        let meal_name  = "Lunch"

        let parsedDiary = JSON.parse(response.body)
        let diary = parsedDiary.rows

        assert.equal(diary.date, date)
        assert.equal(diary.food_name, food_name)
        assert.equal(diary.meal_name, meal_name)

        done()
        });
      });
    });

  describe('PUT /api/diary', () =>{
    xit('should update the name and calories from the resource', (done) => {
      const updateDiary = {
        food_name: "Black Coffee",
        calories: 60
      };
      this.request.put('/api/diary/1',{form: updateDiary}, (error, response) => {
        if (error) {done( error) }
          const date      = 1-1-17
          const food_name = "Black Coffee"
          const meal_name = "Breakfast"

          let updatedDiary =JSON.parse(response.body)
          diary = updatedDiary.rows
          assert.equal(response.statusCode, 201)
          assert.equal(diary.date, date)
          assert.equal(diary.food_name, food_name)
          assert.equal(diary.meal_name, meal_name)
          done();
        });
      });
    });

  describe('DELETE /api/diary/:id', () => {
    it('should delete a diary entry', (done) => {
      this.request.delete('/api/diary/103', (error, response) => {
        if(error) {done(error)}
        assert.equal(response.statusCode, 404)
        done();
      });
    });
  });
});
