'use strict';

module.exports = exports = {};

exports.sendMessage = (res, status, content, contentType) => {
  res.writeHead(status, { 'Content-Type' : `${contentType}` });
  res.write(content);
  res.end();
};