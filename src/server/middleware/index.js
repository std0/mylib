const createError = require('http-errors');

exports.mustBeAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() !== true) {
        throw createError(401, 'Not authorized');
    }
    next();
};
