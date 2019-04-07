const {mustBeAuthenticated} = require('../middleware');
const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const booksRouter = require('./books');

router.use('/users', usersRouter);
router.use('/books', mustBeAuthenticated, booksRouter);

router.get('/', (req, res) => {
    res.status(200).json({isServerWorking: true});
});

module.exports = router;
