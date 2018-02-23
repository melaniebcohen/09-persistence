'use strict';

const request = require('superagent');
require('jest');
require('../server.js');

describe('Kitteh Routes', () => {
  let kitteh = null;

  describe('POST: api/kitteh', () => {
    it('should return a kitteh', function(done) {
      request.post(`localhost:3000/api/kitteh`)
        .send({ name: 'Finn', age: 1.5 })
        .end((err, res) => {
          if (err) return done(err);
          kitteh = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(kitteh.name).toEqual('Finn');
          expect(kitteh.age).toEqual(1.5);
          expect(kitteh.says).toEqual('meow');
          done();
        });
    });
    it('should respond with 404 if no request body was provided or the body was invalid - no content', function(done) {
      request.post(`localhost:3000/api/kitteh`)
        .send({ content: 'i can haz' })
        .end((err, res) => {
          expect(res.text).toEqual('Bad request');
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET: api/kitteh', () => {
    it('should return a kitteh', function(done) {
      request.get(`localhost:3000/api/kitteh?id=${kitteh.id}`)
        .end((err, res) => {
          if (err) return done(err);
          kitteh = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(kitteh.name).toEqual('Finn');
          expect(kitteh.age).toEqual(1.5);
          expect(kitteh.says).toEqual('meow');
          done();
        });
    });
    it('should respond with 404 for valid requests made with an id that was not found', function(done) {
      request.get(`localhost:3000/api/kitteh?id=$1234`)
        .end((err, res) => {
          expect(res.text).toEqual('Route not found');
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should respond with 400 if no id was provided in the request', function(done) {
      request.get(`localhost:3000/api/kitteh`)
        .end((err, res) => {
          expect(res.text).toEqual('Bad request');
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('DELETE: api/kitteh', () => {
    it('should return a 404 error if valid request made with an id that was not found', function(done) {
      request.delete(`localhost:3000/api/kitteh?id=1`)
        .end((err, res) => {
          expect(res.status).toBe(404);
          expect(res.text).toEqual('Id not found');
          done();
        });
    });
    it('should delete a kitteh', function(done) {
      request.delete(`localhost:3000/api/kitteh?id=${kitteh.id}`)
        .end((err, res) => {
          expect(res.status).toEqual(204);
          done();
        });
    });
    it('should respond with bad request if no request body was provided or the body was invalid', function(done) {
      request.delete(`localhost:3000/api/kitteh`)
        .end((err, res) => {
          expect(res.status).toBe(400);
          done();
        });
    });
  });
});