var _ = require('lodash');

var all = {
  env: process.env.NODE_ENV,

  something: 'Default',
  mongodb: 'mongodb://localhost:27017/teams-dev'
};

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
