var assert = require('chai').assert;
var app = require('../server');
var request = require('request');

describe('Server', function() {
  before(function(done){
    this.port = 9876;
    this.server = app.listen(this.port, function(err, result){
      if(err) {return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(function(){
    this.server.close();
  })

  it('should exist', function(){
    assert(app);
  });

  describe('GET /', function(){
    it('should return a 200', function(done){
      this.request.get('/', function(error, response){
        if (error) {return done(error) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the application', function(done){
      var title = app.locals.title;

      this.request.get('/', function(error, response){
        if (error) {return done(error) }
        assert(response.body.includes(title),
          '"${response.body}" does not include "${title}".');
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

  describe('GET /api/food/:id', function(){
    beforeEach(function(){
      app.locals.food = {
        wow: "Banana"
      }
    });
  
    it('should return a 404 if the response is not found', function(done){
      this.request.get('/api/food/random', function(error, response){
        if (error) {done(error)}
        assert.equal(response.statusCode, 404)
        done();
      });
    });

    it('should return a 200 if the response is found', function(done){
      this.request.get('/api/food/wow', function(error, response){
        if (error) {return done(error)}
        assert.equal(response.statusCode, 200);
        assert(response.body.includes("Banana"), 'ID was not included')
        done();
      });
    });  

    it('should have the id and message from the resource', function(done){
      var id = 'wow'
      var message = app.locals.food['wow'];

      this.request.get('/api/food/wow', function(error, response){
        if(error) {return done(error)}
        assert(response.body.includes(id),
          '"${response.body}" does not include "${id}".');
        assert(response.body.includes(message),
          '"${response.body}" does not include "${message}".');
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


