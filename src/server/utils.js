const mongoose = require('mongoose');

exports.splitName = fullName => {
    let nameParts = fullName.split(' ');
    let firstName = nameParts[0];
    let lastName;
    if (nameParts.length > 1) {
        lastName = nameParts[nameParts.length - 1];
    }
    return [firstName, lastName];
};

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

exports.dateCastHandler = (schema, options = {}) => {
    schema.post('save', function (err, doc, next) {
        if (err.name === 'ValidationError') {
            let errors = Object.values(err.errors);
            errors.forEach(error => {
                if (error.name === 'CastError' &&
                    error.kind === 'Date' &&
                    error.path === options.field
                ) {
                    error.message = options.fieldName +
                        ' is not a valid date';
                }
            });
        }
        next();
    });
};
