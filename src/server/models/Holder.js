const mongoose = require('mongoose');

const HolderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, `Holder's first name is required`],
        minlength: [3, `Holder first name's length must be more than 3`],
        maxlength: [36, `Holder first name's length must be less than 36`],
    },
    lastName: {
        type: String,
        required: [true, `Holder's last name is required`],
        minlength: [3, `Holder last name's length must be more than 3`],
        maxlength: [36, `Holder last name's length must be less than 36`],
    }
});

HolderSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

let Holder = mongoose.model('holders', HolderSchema);

module.exports = Holder;
