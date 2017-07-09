const config = require('./config');

require('./app').getApp(config).then((app) => {
    // eslint-disable-next-line no-console
    app.listen('3001', console.log(`Magic happens at port: ${config.port}`));
});
