/* globals __dirname */

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path');

const init = (data) => {
    const app = express();

    const libsPath = path.join(__dirname, '../node_modules');
    app.use('/libs', express.static(libsPath));

    const staticsPath = path.join(__dirname, '../static');
    app.use('/static', express.static(staticsPath));

    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());

    require('./auth').attachTo(app, data);
    require('./routers').attachTo(app, data);
    require('./logger').attachTo(app);
    return {
        app,
        data,
    };
};

module.exports = {
    init,
};
