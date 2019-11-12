'use strict';


const validator = require('validator');

module.exports.handler = function (event, context, callback) {

  setTimeout(() => {
    const result = validator.isEmail('foo@bar.com');
    const response = {
      message: `is email valid?: ${result}`,
      event
    };
    callback(null, response);
  }, 3000);

};
