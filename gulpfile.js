const gulp = require('gulp');

gulp.task('server-start', () => {
    const config = require('./config');

    require('./app').getApp(config).then((app) => {
        app.listen('3001',
            // eslint-disable-next-line no-console
            console.log(`Magic happens at port: ${config.port}`));
    });
});
