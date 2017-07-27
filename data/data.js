const BooksData = require('./books.data');
const UsersData = require('./users.data');
const AuthorsData = require('./authors.data');

const init = (db) => {
    return Promise.resolve({
        books: new BooksData(db),
        users: new UsersData(db),
        authors: new AuthorsData(db),
    });
};

module.exports = { init };
