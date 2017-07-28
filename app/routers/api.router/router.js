const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter.get('/users', (req, res) => {
        if (typeof req.user === 'undefined') {
            res.json({ Error: 'Not Authorised' });
        } else {
            data.users.filterBy({ username: req.user.username }).then((response) => {
                res.send(response);
            });
        }
    });

    apiRouter.get('/books', (req, res) => {
        data.books.getAll().then((response) => {
            res.send(response);
        });
    });
    apiRouter.post('/books', (req, res) => {
        const body = req.body;
        data.books.create(body).then((response) => {
            res.send(response);
        });
    });

    app.use('/api/', apiRouter);
};

module.exports = { attachTo };
