/* globals __dirname */

const fs = require('fs');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const logDirectory = path.join(__dirname, '../../log');

const attachTo = (app) => {
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }

    const accessLogStream = rfs('access.log', {
        interval: '1d',
        path: logDirectory,
    });
    app.use(morgan('combined', { stream: accessLogStream }));
};

module.exports = { attachTo };
