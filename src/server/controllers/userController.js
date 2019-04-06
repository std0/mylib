const createError = require('http-errors');
const passport = require('passport');
const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        let user = new User({
            username: req.body.username,
            password: req.body.password
        });
        await user.save();

        res.status(200).json({message: 'OK'});
    } catch (err) {
        next(err);
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err !== null) {
            return next(err);
        }

        req.login(user, (err) => {
            if (err !== undefined) {
                return next(createError(401, err.message));
            }
            res.status(200).json({message: 'OK'});
        });
    })(req, res);
};

exports.getMyInfo = (req, res) => {
    res.status(200).json(req.user);
};

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({message: 'OK'});
};
