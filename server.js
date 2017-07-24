const start = (dbConnectionString, httpPort) => {
    Promise.resolve().then(() => require('./db').init(dbConnectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            return app.listen(httpPort, () =>
                // eslint-disable-next-line no-console
                console.log(`Magic happens at :${httpPort}`));
        }).then((server) => require('./socket').startIo(server));
};

module.exports = { start };
