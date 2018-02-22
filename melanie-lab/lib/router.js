'use strict';

const parseUrl = require('./parse-url.js');
const parseJson = require('./parse-json.js');
const response = require('./response.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req,res) => {
    Promise.all([
      parseUrl(req),
      parseJson(req),
    ])
      .then( () => {
        if (typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req,res);
          return;
        }
        response.sendMessage(res, 404, 'Route not found', 'text/plain');
        console.error('Router.js - Route is not found.');
      })
      .catch( err => {
        response.sendMessage(res, 400, 'Bad request', 'text/plain');
        console.error(err);
      });
  };
};