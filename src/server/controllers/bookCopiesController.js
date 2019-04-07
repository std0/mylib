const BookCopy = require('../models/BookCopy');

exports.getBookCopies = async (req, res, next) => {
    try {
        let book = res.locals.book;
        let booksCopies = await BookCopy.find({book: book.id})
            .populate('holder');

        res.status(200).json(booksCopies);
    } catch (err) {
        next(err);
    }
};

exports.addBookCopy = async (req, res, next) => {
    try {
        let book = res.locals.book;
        let bookCopy = await new BookCopy({book: book.id}).save();

        res.status(200).json(bookCopy);
    } catch (err) {
        next(err);
    }
};

exports.lendBookCopy = async (req, res, next) => {
    try {
        let bookCopy = res.locals.bookCopy;
        await bookCopy.lend(req.body.holder, req.body.returnDate);

        res.status(200).json({message: 'OK'});
    } catch (err) {
        next(err);
    }
};

exports.returnBookCopy = (req, res, next) => {
    try {
        let bookCopy = res.locals.bookCopy;
        bookCopy.return();

        res.status(200).json({message: 'OK'});
    } catch (err) {
        next(err);
    }
};

exports.removeBookCopy = (req, res, next) => {
    try {
        let bookCopy = res.locals.bookCopy;
        bookCopy.remove();

        res.status(200).json({message: 'OK'});
    } catch (err) {
        next(err);
    }
};
