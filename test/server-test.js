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

    it('should have a body with the name of the application', (done) => {
      var title = app.locals.title

      this.request.get('/', (error, response) => {
        if (error) { done(error) }

        assert(response.body.includes(title),
          `"${response.body}" does not include "${title}".`);
        done();
      });
    })
  });   

  // describe('GET /api/foods', () => { 
  //   beforeEach((done) => {
  //     database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['banana', 35])
  //     database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['strawberry', 40])      
  //     database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['cereal', 135])
  //     .then(() => {
  //       done()
  //     });
  //   });

  //   afterEach((done) => {
  //     database.raw('TRUNCATE foods RESTART IDENTITY')
  //     .then(() => done())
  //   }); 

  //   it ('return all items on the food table', (done) => {
  //     this.request.get('/api/foods', (error, response) => {
  //       if(error) {done(error)}

  //       let parsed = JSON.parse(response.body); 

  //       debugger 

  //       let id_one = 1
  //       let food_name = 'banana'
  //       let calories = 35


  //       assert.deepEqual(parsed[0].food_name, 'banana'); 
  //       assert.deepEqual(parsed[1].food_name, 'strawberry'); 
  //       assert.deepEqual(parsed[2].food_name, 'cereal'); 

  //       assert.deepEqual(parsed[0].calories, 35); 
  //       assert.deepEqual(parsed[1].calories, 40); 
  //       assert.deepEqual(parsed[2].calories, 135); 

  //       done();
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

    it('should have the id, name and message from the resource', (done) => {
      this.request.get('/api/foods/1', (error, response) => {
        if(error) {done(error)}

        const id = 1
        const food_name = 'banana'
        const calories = 35

        let parsedFood = JSON.parse(response.body)

        assert.equal(response.statusCode, 200);
        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.food_name, food_name)
        assert.equal(parsedFood.calories, calories)

        done();
      });
    });
  });

describe('POST /api/foods', () => {
  it('should not return a 404', (done) =>{
    this.request.post('/api/foods', (error, response) => {
      if (error) {done(error) }

      assert.notEqual(response.statusCode, 404)
      done()
    });
  });

  it('should receive and store data', (done) => {
    // const id = {
    //   id: 1
    // }

    const food_name = {
      food_name: 'twix'
    }
    const calories = {
      calories: 335
    }
    this.request.post('/api/foods',{form: food_name, form: calories}, (error, response) =>{
      
      // const id = 1
      const food_name = 'twix'
      const calories = 335

      let parsedFood = JSON.parse(response.body)

      // assert.equal(parsedFood.id, id)
      assert.equal(parsedFood.food_name, food_name)
      assert.equal(parsedFood.calories, calories)

      done()
      })
    });
  });
});