const attachTo = (app, data) => {
    app.get('/users', (req, res) => {
        res.send('<h1>Users server route. It works</h1>');
    });
    app.get('/books', (req, res) => {
        data.books.sortAndLimit({ _id: -1 }, 6).then((context) => {
            res.render('books', { context });
        });
    });
    app.get('/authors', (req, res) => {
        res.send('<h1>Authors route. It works</h1>');
    });
};

module.exports = { attachTo };
