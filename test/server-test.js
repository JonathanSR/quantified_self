const assert = require('chai').assert;
const app = require('../server');
const request = require('request');

const environment   = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database      = require('knex')(configuration)


describe('Server', () => {
  before(done => {
    this.port = 9876

    this.server = app.listen(this.port, (err, result) => {
      if(err) {return done(err) }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
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

    it('should have a body with the name of the application', function(done){
      var title = app.locals.title;

      this.request.get('/', (error, response) => {
        if (error) { done(error) }

        assert(response.body.includes(title),
          `"${response.body}" does not include "${title}".`);
        done();
      });
    })
  });

  // describe('GET /api/food', function(){
  //   beforeEach(function(){
  //     app.locals.food = {
  //       wow: "Banana",
  //       wowo: "Orange",
  //     }
  //   });

  //   it('should return a 404 if the response is not found', function(done){
  //     this.request.get('/api/food/', function(error, response){
  //       if (error) {done(error)}
  //       assert.equal(response.statusCode, 404)
  //       done();
  //     });
  //   });

  //   it('should return a 200 if the response is found', function(done){
  //     this.request.get('/api/food/', function(error, response){
  //       if (error) {return done(error)}
  //       assert.equal(response.statusCode, 200);
  //       done();
  //     });
  //   });

  //   it('should return all of the food', function(done){

  //     this.request.get('/api/food', function(done){
  //       assert.equal(response.statusCode, 200)
  //     });
  //   });
  // });

  describe('GET /api/foods/:id', () => {
    beforeEach((done) => {
      database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['banana', 35])
      .then(() => {
        done()
      });
    });

    afterEach((done) => {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => done())
    })

    it('should return a 404 if the response is not found', (done) => {
      this.request.get('/api/foods/1000', (error, response) => {
        if (error) {done(error)}

        assert.equal(response.statusCode, 404)
        done();
      });
    });

    xit('should return a 200 if the response is found', function(done){
      this.request.get('/api/food/wow', function(error, response){
        if (error) {return done(error)}
        assert.equal(response.statusCode, 200);
        assert(response.body.includes("Banana"), 'ID was not included')
        done();
      });
    });

    it('should have the id, name and message from the resource', (done) => {
      this.request.get('/api/food/1', (error, response) => {
        if(error) {done(error)}

        const id = 1
        const name = 'banana'
        const calories = 35

        let parsedFood = JSON.parse(response.body)
        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.name, name)
        assert.equal(parsedFodd.calories, calories)

        done();
      });
    });
  });

  // describe('POST /api/foods', function(){

  //   it('should not return a 404', function(done){
  //     this.request.post('/api/foods', function(error, response){
  //       if (error) {return done(error)}
  //       assert.notEqual(response.statusCode, 404)
  //       done();
  //     });
  //   });
  // });

  // describe('DELETE /api/foods/:id', function(){
  //   beforeEach(function(){
  //     app.locals.foods = {
  //       wow: "Banana"
  //     };
  //   });

  //   it('should return a 404 if the food is not found', function(done){
  //     this.request.delete('api/foods/wow', function(error, response){
  //       if(error) {return done(error)}

  //       assert.equal(response.statusCode, 404)
  //       done();
  //     });
  //   });
  // });
});
