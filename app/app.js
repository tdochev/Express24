const build = require('./build');
const { connect } = require('../db');
const { initData } = require('../data');

const getApp = (config) => {
    const app = build();
    return Promise.resolve()
        .then(connect(config.connectionString))
        .then((db) => {
            const data = initData(db);

            require('./routers')
                .attachTo(app, data);

            return app;
        });
};

module.exports = {
    getApp,
};
