const Book = require('../models/Book');
const BookCopy = require('../models/BookCopy');

exports.getBooksList = async (req, res) => {
    let books = await Book.find({ownerId: req.user._id})
        .populate('author');

    res.status(200).json(books);
};

exports.addBook = async (req, res, next) => {
    try {
        let book = new Book({
            ownerId: req.user._id,
            title: req.body.title,
            releaseYear: req.body.releaseYear
        });
        await book.setAuthor(req.body.author);
        await book.save();

        res.status(200).json({message: 'OK'});
    } catch (err) {
        next(err);
    }
};

exports.getBook = async (req, res, next) => {
    try {
        let book = res.locals.book;
        await book.populate('author').execPopulate();

        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

exports.editBook = async (req, res, next) => {
    try {
        let book = res.locals.book;
        book.title = req.body.title;
        book.releaseYear = req.body.releaseYear;
        await book.setAuthor(req.body.author);
        await book.save();

        res.status(200).json({message: 'OK'});
    } catch (err) {
        next(err);
    }
};

exports.removeBook = async (req, res, next) => {
    try {
        let book = res.locals.book;
        await BookCopy.remove({book: book.id});
        book.remove();

        res.status(200).json({message: 'OK'});
    } catch (err) {
        next(err);
    }
};
