const createError = require('http-errors');
const Book = require('../models/Book');

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
