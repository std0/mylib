const mongoose = require('mongoose');
const Author = require('./Author');
const {splitName} = require('../utils');
const {duplicateKeyHandler, dateCastHandler} = require('../utils');

const BookSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, `Title's length must be more than 3`],
        maxlength: [36, `Title's length must be less than 36`],
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors',
        required: true
    },
    releaseYear: {
        type: Date,
        max: [Date.now(), 'Release year must be earlier than now'],
        required: [true, 'Release year is required']
    }
});

BookSchema.options.toJSON = {
    transform: (doc, ret) => {
        return {
            id: ret._id,
            title: ret.title,
            author: doc.author.fullName,
            releaseYear: doc.releaseYear.getFullYear()
        };
    }
};

BookSchema.index({ownerId: 1, title: 1, authorId: 1}, {unique: true});

BookSchema.virtual('author', {
    ref: 'authors',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true
});

BookSchema.methods.setAuthor = async function (authorName = '') {
    let [firstName, lastName] = splitName(authorName);

    let author = await Author.findOne({firstName, lastName});
    if (author === null) {
        author = await new Author({firstName, lastName}).save();
    }

    this.authorId = author._id;
};

BookSchema.plugin(duplicateKeyHandler, {modelName: 'Book'});

BookSchema.plugin(dateCastHandler, {
    field: 'releaseYear',
    fieldName: 'Release year'
});

let Book = mongoose.model('books', BookSchema);

module.exports = Book;
