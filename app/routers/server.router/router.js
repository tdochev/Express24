const attachTo = (app, data) => {
    app.get('/users', (req, res) => {
        res.send('<h1>Users server route. It works</h1>');
    });
    app.get('/books', (req, res) => {
        res.send('<h1>Booksvserver route. It works</h1>');
    });
};

module.exports = { attachTo };
