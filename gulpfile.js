const gulp = require('gulp');
const config = require('./config');

gulp.task('server-start', () => {
    return Promise.resolve()
        .then(() => require('./db').init(config.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(
                config.port,
                // eslint-disable-next-line no-console
                () => console.log(`Magic happends at :${config.port}`));
        });
});
