const {sanitizeBody} = require('express-validator');

module.exports = {
    register: [
        sanitizeBody('username').trim().escape(),
        sanitizeBody('password').trim().escape()
    ],
    login: [
        sanitizeBody('username').trim().escape(),
        sanitizeBody('password').trim().escape()
    ]
};
