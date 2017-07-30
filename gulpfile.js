const gulp = require('gulp');
const config = require('./config');

const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const transpile = require('gulp-babel');

gulp.task('concat:js', () => {
    return gulp.src([
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/socket.io-client/dist/socket.io.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/toastr/build/toastr.min.js',
        ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./static/js/'));
});

gulp.task('app:concat:js', () => {
    return gulp.src('./dev/js/*.js')
        .pipe(concat('app.js'))
        .pipe(transpile({
            presets: ['es2015'],
        }))
        .pipe(gulp.dest('./static/js/'));
});

gulp.task('concat:css', () => {
    return gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/toastr/build/toastr.min.css',
        ])
        .pipe(concatCss('libs.css'))
        .pipe(gulp.dest('./static/css/'));
});

gulp.task('app:concat:css', () => {
    return gulp.src([
            './dev/css/*.css',
        ])
        .pipe(concatCss('app.css'))
        .pipe(gulp.dest('./static/css/'));
});

gulp.task('server-start', [
        'concat:js', 'concat:css', 'app:concat:css', 'app:concat:js',
    ],
    () => {
        // return Promise.resolve()
        //     .then(() => require('./db').init(config.connectionString))
        //     .then((db) => require('./data').init(db))
        //     .then((data) => require('./app').init(data))
        //     .then((app) => {
        //         return app.listen(config.port, () =>
        //             // eslint-disable-next-line no-console
        //             console.log(`Magic happens at :${config.port}`));
        //     }).then((server) => require('./socket').startIo(server));
        require('./server').start(config.connectionString, config.port,
            'Magic happens at:');
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
    require('./server').start(testConfig.connectionString, testConfig.port,
        'Test server running at:');
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
