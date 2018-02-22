'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Kitteh = require('../model/kitteh.js');

module.exports = function(router) {
  router.get('/api/kitteh', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('kitteh', req.url.query.id)
        .then( kitteh => {
          response.sendMessage(res, 200, JSON.stringify(kitteh), 'application/json');
        })
        .catch( err => {
          console.log(err);
          response.sendMessage(res, 404, 'Route not found', 'text/plain');
        });
      return;
    }
    response.sendMessage(res, 400, 'Bad request', 'text/plain');
  });

  router.post('/api/kitteh', function(req, res) {
    try {
      var kitteh = new Kitteh(req.body.name, req.body.age);
      storage.createItem('kitteh', kitteh);
      console.log(kitteh);
      response.sendMessage(res, 200, JSON.stringify(kitteh), 'application/json');
    } catch (err) {
      console.error(err);
      response.sendMessage(res, 400, 'Bad request', 'text/plain');
    }
  });

  router.delete('/api/kitteh', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('kitteh', req.url.query.id)
        .then( () => {
          storage.deleteItem('kitteh', req.url.query.id)
            .then( () => {
              response.sendMessage(res, 200, 'Kitteh is all gone', 'text/plain');
            })
            .catch( () => {
              response.sendText(res, 400, 'bad request');
            });
        })
        .catch( err => {
          if (err.message === 'Schema id not found') {
            response.sendMessage(res, 404, 'Valid request, but id not found', 'text/plain');
          }
        });
    }
    if (!req.url.query.id) {
      response.sendMessage(res, 400, 'Bad request', 'text/plain');
    }
  });
};