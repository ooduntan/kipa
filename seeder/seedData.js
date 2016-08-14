(function() {
  'use strict';

  var mongoose = require('mongoose');
  var roleObj = require('../api/server/service/roleService');

  var defaultRoles = [
    { role: 'Fellow' },
    { role: 'Trainer' },
    { role: 'Investor' }
  ];

  function exit() {
    process.exit(0);
  }
  
  roleObj.getRoles({}, function(bool, roles) {
    var dataSaved = 0;

    if (roles.length <= 0) {
      defaultRoles.forEach(function(element) {
        roleObj.saveRole(element, function(bool, message) {
          dataSaved += 1;
          bool ? console.log('success!') : console.log(message);

          if (defaultRoles.length === dataSaved) exit();
        });
      });
    } else {
      console.log('Done...')
      process.exit(0);
    }
  });

}());
