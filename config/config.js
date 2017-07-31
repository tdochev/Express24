/* globals process */

// eslint-disable-next-line no-process-env
const port = process.env.PORT || '3001';
const connectionString = 'mongodb://localhost/express-24';
const sessionStoreConnectionString = 'mongodb: //localhost/session'

module.exports = {
    port,
    connectionString,
    sessionStoreConnectionString,
};
