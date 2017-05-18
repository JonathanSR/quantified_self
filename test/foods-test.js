const assert        = require('chai').assert;
const app           = require('../server');
const request       = require('request');

const environment   = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database      = require('knex')(configuration)

const Food          = require('../lib/models/food')


describe('Foods Api', () => {
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

  describe('GET /api/foods', () => {
//     beforeEach((done) => {
//       database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['banana', 35]).then (() => {
//       database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['strawberry', 40]).then (() => {
//       database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['cereal', 135]).then (() => {
//         done()
//       });
//     });
//   });
// });

    // afterEach((done) => {
    //   database.raw('TRUNCATE foods RESTART IDENTITY')
    //   .then(() => done())
    // });

    xit ('return all items on the food table', (done) => {
      this.request.get('/api/foods', (error, response) => {
        if(error) {done(error)}

        let parsed = JSON.parse(response.body)

        assert.equal(response.statusCode, 200)
        assert.equal(parsed.length, 185)
        done();
      });
    });
  });

  describe('GET /api/foods/:id', () => {
    // beforeEach((done) => {
    //   database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['banana', 35])
    //   .then(() => {
    //     done()
    //   });
    // });

    // afterEach((done) => {
    //   database.raw('TRUNCATE foods RESTART IDENTITY')
    //   .then(() => done())
    // });

    it('should return a 404 if the response is not found', (done) => {
      this.request.get('/api/foods/1000', (error, response) => {
        if (error) {done(error)}

        assert.equal(response.statusCode, 404)
        done();
      });
    });

    it('should have the id, name and calories from the resource', (done) => {
      this.request.get('/api/foods/1', (error, response) => {
        if(error) {done(error)}

        const id = 1
        const food_name = 'Black Coffee'
        const calories = 0

        let parsedFood = JSON.parse(response.body)

        assert.equal(response.statusCode, 200)
        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.food_name, food_name)
        assert.equal(parsedFood.calories, calories)

        done();
      });
    });
  });

xdescribe('POST /api/foods', () => {
  it('should not return a 404', (done) =>{
    this.request.post('/api/foods', (error, response) => {
      if (error) {done(error) }

      assert.notEqual(response.statusCode, 404)
      done()
    });
  });

  afterEach((done) =>{
    this.request.delete('/api/foods/1', (error, response) => {
      if(error) {done(error)}
      done()
    });
  });

  it('should receive and store data', (done) => {
    var newFood ={
      food_name: 'twix',
      calories: 335
    };

    this.request.post('/api/foods',{form: newFood}, (error, response) =>{
      if (error) { done( error) }

      const id   = 186
      const name = 'twix'
      const cal  = 335

      let parsedFood = JSON.parse(response.body)
      food = parsedFood.rows[0]

      assert.equal(food.id, id)
      assert.equal(food.food_name, name)
      assert.equal(food.calories, cal)

      done()
      });
    });
  });

describe('PUT /api/foods', () =>{
  // beforeEach((done) =>{
  //   database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['banana', 35])
  //   .then(() =>{
  //   done()
  //   });
  // });

  // afterEach((done) => {
  //   database.raw('TRUNCATE foods RESTART IDENTITY')
  //   .then(() => done())
  // });

  it('should update the name and calories from the resource', (done) => {

    const updateFood = {
      food_name: "Black Coffee",
      calories: 0
    };
    this.request.put('/api/foods/1',{form: updateFood}, (error, response) => {
      if (error) {done( error) }

      const id =1
      const name = "Black Coffee"
      const calories = 0

      let updatedFood =JSON.parse(response.body)
      food = updatedFood.rows[0]
      assert.equal(response.statusCode, 201)
      assert.equal(food.id, id)
      assert.equal(food.food_name, name)
      assert.equal(food.calories, calories)
      done();
      });
    });
  });


describe('DELETE /api/foods/:id', () => {
  // beforeEach((done) => {
  //   database.raw('INSERT INTO foods (food_name, calories) VALUES (?, ?)', ['banana', 35])
  //     .then(() => {
  //       done()
  //     });
  //   });

    // afterEach((done) => {
    //   database.raw('TRUNCATE foods RESTART IDENTITY')
    //   .then(() => done())
    // });

    it('should delete a food', (done) => {
      this.request.delete('/api/foods/1', (error, response) => {
        if(error) {done(error)}

        assert.equal(response.statusCode, 204)
        done();
      });
    });
  });
});
