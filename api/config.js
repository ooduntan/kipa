(function() {
  'use strict';

  module.exports = {
    database: process.env.DATABASE || 'mongodb://127.0.0.1:27017/dmsDb',
    port: process.env.PORT,
    secret: process.env.secret
  };
}());
