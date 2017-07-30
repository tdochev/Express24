const booksController = require('./controllers/booksController');
const authorsController = require('./controllers/authorsController');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        const user = req.user;
        const messages = req.flash('error');
        data.books.sortAndLimit({ _id: -1 }, 6).then((context) => {
            res.render('books', {
                context,
                user,
                messages: messages,
            });
        });
    });

    app.get('/users', (req, res) => {
        res.send('<h1>Users server route. It works</h1>');
    });

    app.get('/books', (req, res) => {
        booksController.showAll(req, res, data);
    });

    app.get('/authors', (req, res) => {
        authorsController.showAllBooksOfAuthor(req, res, data);
    });

    app.get('/books/show/:id', (req, res) => {
        booksController.showById(req, res, data);
    });

    app.get('/bookshelf', (req, res) => {
        const user = req.user;
        if (typeof user === 'undefined') {
            req.flash('error', 'You must log in to use bookshelf!');
            res.redirect('/');
        }
        res.render('bookshelf', { user: user, messages: req.flash('error') });
    });

    app.get('/bookshelf/add/:bookID', (req, res) => {
        const user = req.user;
        if (typeof user === 'undefined') {
            req.flash('error', 'You must log in to use bookshelf!');
            res.redirect('/');
        }
        const bookId = req.params.bookID;
        data.books.filterBy({ bookId: bookId }).then((book) => {
            data.users.addToBookShelf(user._id, book);
            res.redirect('/bookshelf');
        });
    });


    app.get('/bookshelf/remove/:bookID', (req, res) => {
        const user = req.user;
        const bookId = req.params.bookID;
        if (typeof user === 'undefined') {
            req.flash('error', 'You must log in to use bookshelf!');
            res.redirect('/');
        }
        data.users.removeFromBookShelf(user._id, bookId);
        res.redirect('/bookshelf');
    });

    app.get('*', (req, res) => {
        res.status(404).send('THIS IS 404!');
    });
};

module.exports = { attachTo };
