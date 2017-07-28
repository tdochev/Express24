const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const { ObjectID } = require('mongodb');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    addToBookShelf(username, book) {
        return this.findByUsername(username)
            .then((user) => {
                console.log(user.bookshelf);
            });
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
