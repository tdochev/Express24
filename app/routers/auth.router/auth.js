const { Router } = require('express');
const Passport = require('passport');

const attachTo = (app, data) => {
    const authRouter = new Router();

    authRouter.post('/sign-up', (req, res) => {
        const { username, password } = req.body;
        return data.users.create(username,
                password)
            .then(() => {
                res.send('/auth/sign-in');
            });
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
