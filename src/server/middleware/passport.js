const createError = require('http-errors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy(async (username, password, done) => {
    let user = await User.findOne({username: username});

    if (user === null) {
        return done(createError(401, 'Username not found'), false);
    }

    if (await user.comparePassword(password) === false) {
        return done(createError(401, 'Invalid password'), false);
    }

    return done(null, user);
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(
        (user) => done(null, user),
        (err) => done(err, null)
    );
});

module.exports = passport;
