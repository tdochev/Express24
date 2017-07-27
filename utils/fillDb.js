const { MongoClient } = require('mongodb');

const fillData = (coonectionString, pathToJSONFile, collectionName) => {
    MongoClient.connect(coonectionString)
        .then((db) => {
            // eslint-disable-next-line no-console
            console.log('Databases connected');
            const table = require(pathToJSONFile).table;
            db.collection(collectionName).insert(table);
            // eslint-disable-next-line no-console
            console.log('Test data inserted!');
        });
};

module.exports = { fillData };
