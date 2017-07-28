class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.bookshelf = [];
    }
}

module.exports = User;
