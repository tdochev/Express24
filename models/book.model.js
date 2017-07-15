const Item = require('./item.model');

class Book extends Item {
    constructor(name, priceExVat, isbn, author, publisher) {
        super(name, priceExVat);
        this._isbn = isbn;
        this._author = author;
        this._publisher = publisher;
    }
}

module.exports = Book;
