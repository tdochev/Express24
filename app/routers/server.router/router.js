const attachTo = (app, data) => {
    app.get('/users', (req, res) => {
        res.send('<h1>Users server route. It works</h1>');
    });
    app.get('/books', (req, res) => {
        res.send('<h1>Books server route. It works</h1>');
    });
    app.get('/authors', (req, res) => {
        res.send('<h1>Authors route. It works</h1>');
    });
};

module.exports = { attachTo };
