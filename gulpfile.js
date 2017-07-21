const gulp = require('gulp');
const config = require('./config');

const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

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

gulp.task('pre-test', () => {
    return gulp.src([
            './data/**/*.js',
            './app/**/*.js',
            './config/**/*.js',
            './db/**/*.js',
            './models/**/*.js',
            './server.js',
        ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
            './test/unit/**/*.js',
            './test/integration/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'spec',
        }))
        .pipe(istanbul.writeReports());
});
