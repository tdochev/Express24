const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString).then((db) => {
        // eslint-disable-next-line no-console
        console.log('Connected to DB!');
        console.log(connectionString);
        return db;
    });
};

module.exports = {
    init,
};
