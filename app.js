var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let methodOverride = require('method-override')
require('./config/database');
let session = require('express-session');
let passport = require('passport');
require('./config/passport');
require('dotenv').config();
let multer = require('multer')
let upload = multer({ dest: 'uploads/'})


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jobsRouter = require('./routes/jobs');
let clientsRouter = require('./routes/clients')
let uploadsRouter = require('./routes/uploads');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/jobs', upload.single('source', function (req, res, next){next}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'anything',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.static('uploads'));


app.use('/', indexRouter);
app.use('/users', isLoggedIn, usersRouter);
app.use('/jobs', isLoggedIn, jobsRouter);
app.use('/clients', isLoggedIn, clientsRouter);
app.use('/uploads', isLoggedIn, uploadsRouter);

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

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = app;
