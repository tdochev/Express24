const { Router } = require('express');
const Passport = require('passport');

const attachTo = (app, data) => {
    const authRouter = new Router();

    authRouter.post('/sign-up', (req, res) => {
        const user = req.body;
        return data.users.create(user)
            .then(() => {
                res.redirect('/auth/sign-in');
            });
    });
    authRouter.post('/sign-in', Passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/sign-in',
        failureFlash: true,
    }));

    app.use('/auth/', authRouter);
};

module.exports = { attachTo };
