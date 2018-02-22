'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, age) {
  if (!name) throw new Error('Expected name');
  if (!age) throw new Error('Expected age');

  this.id = uuidv4();
  this.name = name;
  this.age = age;
  this.says = 'meow';
};