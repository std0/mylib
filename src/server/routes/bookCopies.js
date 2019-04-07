const {bookCopyMustExist} = require('../middleware');
const sanitizer = require('../middleware/sanitizer');
const express = require('express');
const router = express.Router({mergeParams: true});
const bookCopiesController = require('../controllers/bookCopiesController');

router.get('/', bookCopiesController.getBookCopies);

router.post('/add', bookCopiesController.addBookCopy);

router.post('/:copyId/lend', sanitizer.lendBookCopy, bookCopyMustExist,
    bookCopiesController.lendBookCopy
);

router.post('/:copyId/return', bookCopyMustExist,
    bookCopiesController.returnBookCopy
);

router.post('/:copyId/remove', bookCopyMustExist,
    bookCopiesController.removeBookCopy
);

module.exports = router;
