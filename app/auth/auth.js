const passport = require('passport');
const { Strategy } = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./../../config');

const attachTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
        data.users.findByUsername(username)
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
            })
            .catch((err) => {
                done(err);
            });
    }));

    const sessionStore = new MongoStore({ url: config.sessionStoreConnectionString });
    app.use(session({
        store: sessionStore,
        secret: 'H@ck Th1$',
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.getById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };
        next();
    });

    return {
        sessionStore,
    };
};

module.exports = { attachTo };
