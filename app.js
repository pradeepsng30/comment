var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var create = require('./routes/create');
var remove = require('./routes/delete');
var update = require('./routes/update');
var login = require('./routes/login');
var validate = require('./routes/validate');
var getId = require('./routes/get-id');
var passport = require('passport');
var app = express();

var GITHUB_CLIENT_ID = "22b456f406455552b3f8";
var GITHUB_CLIENT_SECRET = "cfb86a8f13a0f9aeb25913c4650e34747733d236";
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  state:false,
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('PPP', profile);
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

// app.use(passport.initialize());
// app.use(passport.session());
app.get('/get-data',
passport.authenticate('github'));

app.get('/auth/github/callback', 
passport.authenticate('github', { failureRedirect: '/get-data' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// const session = require('express-session')
// app.use(session({
//   genid: (req) => {
//     console.log('Inside the session middleware')
//     console.log(req.sessionID)
//     return uuid() // use UUIDs for session IDs
//   },
//   store: new FileStore(),
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/',passport.authenticate('github', { failureRedirect: '/get-data' }), indexRouter);
app.use('/create', create);
app.use('/delete', remove);
app.use('/update', update);
app.use('/validate', validate);
app.use('/login', login);
app.use('/get-id', getId);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
