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
            return app.listen(config.port, () =>
                // eslint-disable-next-line no-console
                console.log(`Magic happens at :${config.port}`));
        }).then((server) => require('./socket').startIo(server));
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

const testConfig = {
    connectionString: 'mongodb://localhost/items-db-test',
    port: 3002,
};

gulp.task('test-server:start', () => {
    return Promise.resolve()
        .then(() => require('./db').init(testConfig.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(
                testConfig.port,
                // eslint-disable-next-line no-console
                () => console.log(
                    `Test server running at :${testConfig.port}`
                ));
        });
});

const { MongoClient } = require('mongodb');

gulp.task('test-server:stop', () => {
    return MongoClient.connect(testConfig.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

gulp.task('tests:browser', ['test-server:start'], () => {
    return gulp.src('./test/browser/books/getAll.js')
        .pipe(mocha({
            reporter: 'spec',
            timeout: 10000,
        }))
        .once('end', () => {
            gulp.start('test-server:stop');
        });
});
