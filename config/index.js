var _ = require('lodash');

var all = {
  env: process.env.NODE_ENV,

  something: 'Default'
};

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
