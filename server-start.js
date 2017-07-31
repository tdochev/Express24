const config = require('./config');

require('./server').start(config.connectionString, config.port,
    'Magic happens at:');
