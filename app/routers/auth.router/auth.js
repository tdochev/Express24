const { Router } = require('express');
const Passport = require('passport');

const attachTo = (app, data) => {
    const authRouter = new Router();

    authRouter.post('/sign-up', (req, res) => {
        const { username, password } = req.body;
        let usernameExists;
        data.users.findByUsername(username).then((r) => {
            usernameExists = r;
        });
        if (typeof usernameExists === 'undefined') {
            return data.users.create(username,
                    password)
                .then(() => {
                    res.redirect('/');
                });
        }
        req.flash('error', 'This username is already taken!');
        return res.redirect('/');
    });

    authRouter.post('/sign-in', Passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true,
    }));

    authRouter.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.use('/auth/', authRouter);
};

module.exports = { attachTo };
