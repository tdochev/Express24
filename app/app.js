const express = require('express');

const init = (data) => {
    const app = express();
    app.set('view engine', 'pug');

    return Promise.resolve(app);
};

module.exports = {
    init,
};
