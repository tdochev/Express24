const BooksData = require('./books.data');

const init = (db) => {
    return Promise.resolve({
        books: new BooksData(db),
    });
};

module.exports = { init };
