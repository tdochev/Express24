let io = require('socket.io');

const startIo = (server) => {
    io = io.listen(server);
    io.on('connection', (socket) => {
        socket.emit('server', { msg: 'Hi from server!' });
    });
};

module.exports = { startIo };
