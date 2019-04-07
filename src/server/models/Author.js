const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, `Author's first name is required`],
        minlength: [3, `Author first name's length must be more than 3`],
        maxlength: [36, `Author first name's length must be less than 36`],
    },
    lastName: {
        type: String,
        required: [true, `Author's last name is required`],
        minlength: [3, `Author last name's length must be more than 3`],
        maxlength: [36, `Author last name's length must be less than 36`],
    }
});

AuthorSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

let Author = mongoose.model('authors', AuthorSchema);

module.exports = Author;
