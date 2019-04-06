const mongoose = require('mongoose');

exports.duplicateKeyHandler = (schema, options = {}) => {
    schema.post('save', function (err, doc, next) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return next(new mongoose.Error.ValidatorError({
                message: `${options.modelName} already exists`
            }));
        }
        next();
    });
};
