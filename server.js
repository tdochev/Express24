const start = (dbConnectionString, httpPort, msg) => {
    Promise.resolve()
        .then(() => require('./db').init(dbConnectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then(({ app, data }) => {
            const server = app.listen(httpPort, () => {
                // eslint-disable-next-line no-console
                console.log(`${msg} ${httpPort}`);
            });
            require('./socket').startIo(server, app, data);
        });
};

module.exports = { start };
