const attachTo = (app, data) => {
    app.get('/api/users', (req, res) => {
        res.send('<h1>Users API. It works</h1>');
    });
    app.get('/api/books', (req, res) => {
        const books = data.books.getAll().then((response) => {
            res.send(response);
        });
    });
    app.post('/api/books', (req, res) => {
        const body = req.body;
        console.log(body);
        data.books.create(body).then((response) => {
            res.send(response);
        });
    });
};

module.exports = { attachTo };
