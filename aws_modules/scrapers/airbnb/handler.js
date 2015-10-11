'use strict';

/**
 * AWS Module: Action: Lambda Handler
 * "Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent"
 */

require('jaws-core-js/env')

// Modularized Code
var action = require('./index.js')

// Lambda Handler
module.exports.handler = function handler (event, context) {

  action.run(event, context).then(function (result) {
    return context.done(null, result)
  }).catch(function (e) {
    return context.done(e)
  })
}
