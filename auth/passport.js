var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    _ = require('lodash');

var users = [
  {username: 'admin', password: 'password'},
  {username: 'test', password: 'test'},
  {username: 'shyam', password: 'seshadri'}
];

passport.use(new LocalStrategy(
  function(username, password, done) {
    var user = _.find(users, {username: username});
    if (!user) {
      return done(null, false, { msg: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { msg: 'Incorrect password.' });
    }
    return done(null, user);
  }
));


passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  var user = _.find(users, {username: username});
  if (user) {
    done(null, user);
  } else {
    done('Unable to find user - ' + username);
  }
});
