var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const Fruit = require('./models/fruit');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/ajaxsearch', { useNewUrlParser: true });

app.get('/', (req, res, next) => {
    Fruit.find({}, (err, fruits) => {
        if (err)
            return next(err);
        console.log('fruits', fruits);
        res.render('index', { fruits: fruits });
    });
});

app.get('/search', (req, res, next) => {
    // Use RegExp to find documents with name LIKE req.query.q
    Fruit.findOne({ name: new RegExp(req.query.q, "i") }, (err, fruit) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json({ data: fruit });
    });
});

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
