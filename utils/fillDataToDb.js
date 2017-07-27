/* globals __dirname */

const fillDb = require('./fillDb');
const config = require('../config');

const connectionString = config.connectionString;
const path = __dirname + '/data/books.json';
const collection = 'books';

fillDb.fillData(connectionString, path, collection);
