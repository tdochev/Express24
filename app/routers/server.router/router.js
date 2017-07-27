const booksController = require('./controllers/booksController');
const authorsController = require('./controllers/authorsController');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        data.books.sortAndLimit({ _id: -1 }, 6).then((context) => {
            res.render('books', { context });
        });
    });

    app.get('/users', (req, res) => {
        res.send('<h1>Users server route. It works</h1>');
    });

    app.get('/books', (req, res) => {
        booksController.showAll(req, res, data);
    });

    app.get('/authors', (req, res) => {
        authorsController.showAll(req, res, data);
    });

    app.get('/books/show/:id', (req, res) => {
        booksController.showById(req, res, data);
    });
};

module.exports = { attachTo };
