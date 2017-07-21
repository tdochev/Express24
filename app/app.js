const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const init = (data) => {
    const app = express();
    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());

    require('./auth').attachTo(app, data);
    require('./routers').attachTo(app, data);
    require('./logger').attachTo(app);
    return app;
};

module.exports = {
    init,
};
