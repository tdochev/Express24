const request = require('supertest');

describe('Integration tests', () => {
    describe('/books API tests', () => {
        const connectionString = 'mongodb://localhost/express24-db-test';
        let app = null;

        beforeEach(() => {
            return Promise.resolve()
                .then(() => require('../../../db').init(connectionString))
                .then((db) => require('../../../data').init(db))
                .then((data) => require('../../../app').init(data))
                .then((_app) => {
                    app = _app;
                });
        });

        describe('GET api/books', () => {
            it('expect to return 200', (done) => {
                request(app)
                    .get('/api/books')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });
    });
});
