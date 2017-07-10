/* globals __dirname */

const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const logDirectory = path.join(__dirname, 'log');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory,
});

const build = () => {
    const app = express();
    app.set('view engine', 'pug');
    app.use(morgan('combined', { stream: accessLogStream }));

    return app;
};

module.exports = build;
