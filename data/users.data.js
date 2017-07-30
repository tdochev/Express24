const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const { ObjectID } = require('mongodb');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    addToBookShelf(userId, book) {
        return (
            this.collection.update({ _id: userId }, { $addToSet: { bookshelf: book[0] } })
        );
    }

    getBookshelf(userId) {
        return this.collection.find({ _id: userId }, { bookshelf: 1 })
            .toArray();
    }

    getById(id) {
        return this.collection.findOne({ _id: new ObjectID(id) })
            .then((user) => {
                if (!user) {
                    return null;
                }

                user.id = user._id;
                return user;
            });
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }

    create(username, password) {
        const user = {
            username,
            password,
        };

        return this.collection.insert(user)
            .then((result) => {
                return user;
            });
    }
}

module.exports = UsersData;
