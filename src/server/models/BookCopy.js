const mongoose = require('mongoose');
const Holder = require('../models/Holder');
const {splitName, dateCastHandler} = require('../utils');

const BookCopySchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
        required: true
    },
    holder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'holders'
    },
    returnDate: {
        type: Date,
        min: [Date.now(), 'Return date must be later than now'],
        required: [
            function () {
                return this.holder !== null && this.holder !== undefined;
            },
            'Return date is required'
        ]
    }
});

BookCopySchema.options.toJSON = {
    transform: (doc, ret) => {
        let newRet = {id: ret._id};
        if (ret.holder !== undefined) {
            newRet.holder = doc.holder.fullName;
            newRet.returnDate = ret.returnDate;
        }
        return newRet;
    }
};

BookCopySchema.methods.setHolder = async function (holderName = '') {
    let [firstName, lastName] = splitName(holderName);

    let holder = await Holder.findOne({firstName, lastName});
    if (holder === null) {
        holder = await new Holder({firstName, lastName}).save();
    }

    this.holder = holder._id;
};

BookCopySchema.methods.lend = async function (holder, returnDate) {
    if (this.holder !== undefined) {
        throw new mongoose.Error.ValidatorError({
            message: 'Book copy is already occupied'
        });
    }

    this.returnDate = returnDate;
    await this.setHolder(holder);
    await this.save();
};

BookCopySchema.methods.return = function () {
    if (this.holder === undefined) {
        throw new mongoose.Error.ValidatorError({
            message: 'Book copy is already available'
        });
    }

    this.holder = undefined;
    this.returnDate = undefined;
    this.save();
};

BookCopySchema.plugin(dateCastHandler, {
    field: 'returnDate',
    fieldName: 'Return date'
});

let BookCopy = mongoose.model('booksCopies', BookCopySchema);

module.exports = BookCopy;
