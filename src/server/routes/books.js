const {mustBeBookOwner} = require('../middleware');
const sanitizer = require('../middleware/sanitizer');
const express = require('express');
const router = express.Router();
const bookCopiesRouter = require('./bookCopies');
const bookController = require('../controllers/bookController');

router.use('/:bookId/copies', mustBeBookOwner, bookCopiesRouter);

router.get('/', bookController.getBooksList);

router.post('/add', sanitizer.addBook, bookController.addBook);

router.get('/:bookId', mustBeBookOwner, bookController.getBook);

router.post('/:bookId/edit', sanitizer.editBook, mustBeBookOwner,
    bookController.editBook
);

router.post('/:bookId/remove', mustBeBookOwner,
    bookController.removeBook
);

module.exports = router;
