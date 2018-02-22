'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('Expected schema name'));
  if (!item) return Promise.reject(new Error('Expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item )
    .catch( err => Promise.reject(err) );
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('Expected schema name'));
  if (!id) return Promise.reject(new Error('Expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`, JSON)
    .then( data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        console.error(err);
        return Promise.reject;
      }
    })
    .catch( err => Promise.reject(err) );
};

// exports.deleteItem = function(schemaName, id) {
//   return new Promise((resolve, reject) => {
//     if (!schemaName) return reject(new Error('Expected schema name'));
//     if (!id) return reject(new Error('Expected id'));

//     let schema = storage[schemaName];
//     if (!schema) return reject(new Error('Schema not found'));

//     delete schema[id];

//     resolve();
//   });
// };