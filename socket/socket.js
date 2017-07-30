let io = require('socket.io');

const startIo = (server, app, data) => {
    let ip;

    io = io.listen(server);
    io.on('connection', (socket) => {
        socket.emit('chat', { msg: 'Hi from server!', id: socket.id, sender: 'Express-24' });
        socket.on('chat', (msg) => {
            socket.emit('chat', { msg: msg, id: socket.id, sender: 's' });
        });
    });
};

module.exports = { startIo };
