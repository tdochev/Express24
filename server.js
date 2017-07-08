const config = require('./config');

require('./db').init(config.connectionString)
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port, () => {
            console.log(`Magic happens at port ${config.port}!`);
        });
    });
