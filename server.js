const config = require('./config');

Promise.resolve().then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port, () =>
            // eslint-disable-next-line no-console
            console.log(`Magic happends at :${config.port}`));
    });
