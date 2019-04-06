const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {duplicateKeyHandler} = require('../utils');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [6, `Username's length must be more than 6`],
        maxlength: [36, `Username's length must be less than 36`],
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, `Password's length must be more than 6`],
        maxlength: [36, `Password's length must be less than 36`]
    }
});

UserSchema.options.toJSON = {
    transform: (doc, ret) => {
        return {
            id: ret._id,
            username: ret.username
        };
    }
};

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    }
    next();
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.plugin(duplicateKeyHandler, {modelName: 'User'});

let User = mongoose.model('users', UserSchema);

module.exports = User;
