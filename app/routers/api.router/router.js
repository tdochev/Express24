const attachTo = (app, data) => {
    app.get('/api/users', (req, res) => {
        res.send('<h1>Users API. It works</h1>');
    });
    app.get('/api/books', (req, res) => {
        res.send('<h1>Books API. It works</h1>');
    });
};

module.exports = { attachTo };
