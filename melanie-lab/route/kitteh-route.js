'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Kitteh = require('../model/kitteh.js');

module.exports = function(router) {
  router.get('/api/kitteh', (req, res) => {
    if (req.url.query.id) {
      storage.fetchItem('kitteh', req.url.query.id)
        .then( kitteh => {
          response.sendMessage(res, 200, JSON.stringify(kitteh), 'application/json');
        })
        .catch( err => {
          console.error(err.message);
          response.sendMessage(res, 404, 'Route not found', 'text/plain');
        });
      return;
    }
    response.sendMessage(res, 400, 'Bad request', 'text/plain');
  });

  router.post('/api/kitteh', (req, res) => {
    try {
      var kitteh = new Kitteh(req.body.name, req.body.age);
      storage.createItem('kitteh', kitteh);
      response.sendMessage(res, 200, JSON.stringify(kitteh), 'application/json');
    } catch (err) {
      console.error(err.message);
      response.sendMessage(res, 400, 'Bad request', 'text/plain');
    }
  });

  router.delete('/api/kitteh', (req, res) => {
    if (req.url.query.id === undefined) {
      response.sendMessage(res, 400, 'Bad request', 'text/plain');
    } else {
      storage.deleteItem('kitteh', req.url.query.id)
        .then( () => {
          response.sendMessage(res, 204, 'Kitteh is all gone', 'text/plain');
        })
        .catch( () => {
          response.sendMessage(res, 404, 'Id not found', 'text/plain');
        });
    }
  });
};