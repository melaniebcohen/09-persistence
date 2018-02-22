'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, content) {
  if (!name) throw new Error('Expected name');
  if (!content) throw new Error('Expected content');

  this.id = uuidv4();
  this.name = name;
  this.content = content;
  this.says = 'meow';
};