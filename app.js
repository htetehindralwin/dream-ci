var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: "DreamC!2024",
    resave: false,
    saveUninitialzed: true,
  })
);

// mongoose.connect("mongodb://127.0.0.1/dreamcidb");
// const db = mongoose.connection;
// db.on('error', console.error.bind("MongoDB connection error for dreamci"));

mongoose.connect("mongodb+srv://skyler:keen123@dreamci.f2rexik.mongodb.net/?retryWrites=true&w=majority&appName=dreamci");
const db = mongoose.connection;
db.on('error', console.error.bind("MongoDB connection error for dreamci"));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
