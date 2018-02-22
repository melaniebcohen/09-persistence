'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Kitteh Routes', function() {
  let kitteh = null;

  describe('POST: api/kitteh', function() {
    it('should return a kitteh', function(done) {
      request.post(`localhost:3000/api/kitteh`)
        .send({ name: 'test kitteh name', age: 2 })
        .end((err, res) => {
          if (err) return done(err);
          kitteh = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(kitteh.name).toEqual('test kitteh name');
          expect(kitteh.age).toEqual(2);
          expect(kitteh.says).toEqual('meow');
          done();
        });
    });
    it('should respond with 404/bad request if no request body was provided or the body was invalid - no content', function(done) {
      request.post(`localhost:3000/api/kitteh`)
        .send({ name: 'Freyja' })
        .end((err, res) => {
          expect(res.text).toEqual('Bad request');
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should respond with 404/bad request if no request body was provided or the body was invalid - no content', function(done) {
      request.post(`localhost:3000/api/kitteh`)
        .send({ content: 'i can haz' })
        .end((err, res) => {
          expect(res.text).toEqual('Bad request');
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: api/kitteh', function() {
    it('should return a kitteh', function(done) {
      request.get(`localhost:3000/api/kitteh?id=${kitteh.id}`)
        .end((err, res) => {
          if (err) return done(err);
          kitteh = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(kitteh.name).toEqual('test kitteh name');
          expect(kitteh.age).toEqual(2);
          expect(kitteh.says).toEqual('meow');
          done();
        });
    });
    it('should respond with 404/not found for valid requests made with an id that was not found', function(done) {
      request.get(`localhost:3000/api/kitteh?id=$1234`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should respond with bad request if no id was provided in the request', function(done) {
      request.get(`localhost:3000/api/kitteh`)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should respond with 404 for improper route requests', function(done) {
      request.get(`localhost:3000/api`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });

  // describe('DELETE: api/kitteh', function() {
  //   it('should return a 404 error if valid request made with an id that was not found', function(done) {
  //     request.delete(`localhost:3000/api/kitteh?id=1`)
  //       .end((err, res) => {
  //         expect(res.status).toBe(404);
  //         expect(res.text).toEqual('Valid request, but id not found');
  //         done();
  //       });
  //   });
  //   it('should delete a kitteh', function(done) {
  //     request.delete(`localhost:3000/api/kitteh?id=${kitteh.id}`)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).toEqual(200);
  //         expect(res.text).toEqual('Kitteh is all gone');
  //         done();
  //       });
  //   });
  //   it('should respond with bad request if no request body was provided or the body was invalid', function(done) {
  //     request.delete(`localhost:3000/api/kitteh`)
  //       .end((err, res) => {
  //         expect(res.status).toBe(400);
  //         expect(res.text).toEqual('Bad request');
  //         done();
  //       });
  //   });
  // });
});