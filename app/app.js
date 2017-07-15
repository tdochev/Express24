/* globals __dirname */

const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const logDirectory = path.join(__dirname, 'log');
const bodyParser = require('body-parser');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory,
});

const init = (data) => {
    const app = express();
    app.set('view engine', 'pug');
    app.use(morgan('combined', { stream: accessLogStream }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    require('./routers').attachTo(app, data);
    return app;
};

module.exports = {
    init,
};
