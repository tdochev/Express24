const Book = require('../models/book.model');

class AuthorsData {
    constructor(db) {
        this.db = db;
        this.ModelClass = Book;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        return this.collection.distinct('author');
    }

    aggregate(props, cb) {
        return this.collection.aggregate(props, cb);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = AuthorsData;
