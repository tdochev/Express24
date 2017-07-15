const { Router } = require('express');

const attachTo = (app, data, authProvider) => {
    const authRouter = new Router();

    authRouter.post('/sign-up', (req, res) => {
        const user = req.body;
        return data.users.create(user)
            .then(() => {
                res.redirect('/auth/sign-in');
            });
    });
    authRouter.post('/sign-in', authProvider.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/sign-in',
    }));

    app.use('/auth/', authRouter);
};

module.exports = { attachTo };
