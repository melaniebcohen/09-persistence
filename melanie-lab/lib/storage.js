'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

module.exports = exports = {};

exports.createItem = (schemaName, item) => {
  if (!schemaName) return Promise.reject(new Error('Expected schema name'));
  if (!item) return Promise.reject(new Error('Expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item )
    .catch( err => Promise.reject(err) );
};

exports.fetchItem = (schemaName, id) => {
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

exports.deleteItem = (schemaName, id) => {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('Expected schema name'));
    if (!id) return reject(new Error('Expected id'));

    /* credit: https://stackoverflow.com/questions/36659612/how-does-node-js-fs-unlink-works */
    let resultHandler = err => { 
      if (err) {
        console.log('Unlink failed', err.code);
        return reject();
      } else {
        console.log('File deleted');
        return resolve();
      }
    };
  
    fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`, resultHandler);

  });
};