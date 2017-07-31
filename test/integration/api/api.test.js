const request = require('supertest');

describe('Integration tests', () => {
    describe('/books API tests', () => {
        const connectionString = 'mongodb://localhost/express24-db-test';
        let _app = null;

        beforeEach(() => {
            return Promise.resolve()
                .then(() => require('../../../db').init(connectionString))
                .then((db) => require('../../../data').init(db))
                .then((data) => require('../../../app').init(data))
                .then(({ app, data }) => {
                    _app = app;
                });
        });

        describe('GET api/users', () => {
            it('expect to return 200', (done) => {
                request(_app)
                    .get('/api/users')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });

        describe('GET api/books', () => {
            it('expect to return 200', (done) => {
                request(_app)
                    .get('/api/books')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });

        describe('POST api/books', () => {
            it('expect to return 200', (done) => {
                request(_app)
                    .post('/api/books')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });
        describe('GET api/bookshelf', () => {
            it('expect to return 200', (done) => {
                request(_app)
                    .get('/api/bookshelf')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });
    });
});
