const passport = require('passport');
const { Strategy } = require('passport-local');

const attachTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
        data.users.filterBy({ username: username })
            .then((user) => {
                if (!user) {
                    return done(null,
                        false, { message: 'Incorrect username.' });
                }

                if (user.password !== password) {
                    return done(null,
                        false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // });

    // passport.deserializeUser((id, done) => {
    //     data.users.filterBy(id)
    //         .then((user) => {
    //             done(null, user);
    //         }).catch(done);
    // });
    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };
        next();
    });
};

module.exports = { attachTo };
