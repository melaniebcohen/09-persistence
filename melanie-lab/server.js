'use strict';

const http = require('http');
const Kitteh = require('./model/kitteh.js');
const Router = require('./lib/router.js');
const kittehRouter = require('./route/kitteh-route.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

kittehRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});