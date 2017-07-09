const express = require('express');

const build = () => {
    const app = express();
    app.set('view engine', 'pug');

    return app;
};

module.exports = build;
