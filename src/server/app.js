const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const app = express();

// Parse .env file.
require('dotenv').config();
const env = process.env;
let mongoDbUrl = 'mongodb://';
if (env.MONGODB_USER !== undefined) {
    mongoDbUrl += `${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@`;
}
mongoDbUrl += `${env.MONGODB_HOST}/${env.MONGODB_DBNAME}`;

// Connect to MongoDB.
const mongoose = require('mongoose');
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('build'));

// Express Session.
app.use(session({
    secret: env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));

app.get('/', (req, res) => {
    res.json({message: "OK"});
});

// Catch 404 and forward to error handler.
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler.
app.use(function (err, req, res, next) {
    // Send the error response.
    res.status(err.status || 500).json(err);
});

module.exports = app;