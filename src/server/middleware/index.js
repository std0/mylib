const createError = require('http-errors');
const Book = require('../models/Book');
const BookCopy = require('../models/BookCopy');

exports.mustBeAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() !== true) {
        throw createError(401, 'Not authorized');
    }
    next();
};

exports.mustBeBookOwner = async (req, res, next) => {
    try {
        let book = await Book.findOne({
            ownerId: req.user._id,
            _id: req.params.bookId
        });
        if (book === null) {
            return next(createError(404, 'Book not found'));
        }
        res.locals.book = book;
        next();
    } catch (err) {
        if (err.name === 'CastError') {
            err.message = 'Book ID is not valid';
        }
        next(err);
    }
};

exports.bookCopyMustExist = async (req, res, next) => {
    try {
        let bookCopy = await BookCopy.findOne({
            _id: req.params.copyId,
            book: res.locals.book.id
        });
        if (bookCopy === null) {
            return next(createError(404, 'Book copy not found'));
        }
        res.locals.bookCopy = bookCopy;
        next();
    } catch (err) {
        if (err.name === 'CastError') {
            err.message = 'Book copy ID is not valid';
        }
        next(err);
    }
};
