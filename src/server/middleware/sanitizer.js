const {sanitizeBody} = require('express-validator');

module.exports = {
    register: [
        sanitizeBody('username').trim().escape(),
        sanitizeBody('password').trim().escape()
    ],
    login: [
        sanitizeBody('username').trim().escape(),
        sanitizeBody('password').trim().escape()
    ],
    addBook: [
        sanitizeBody('title').trim().escape(),
        sanitizeBody('author').trim().escape()
    ],
    editBook: [
        sanitizeBody('title').trim().escape(),
        sanitizeBody('author').trim().escape()
    ]
};
