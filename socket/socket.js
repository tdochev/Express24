let io = require('socket.io');

const startIo = (server, app, data) => {
    let ip;

    io = io.listen(server);
    io.on('connection', (socket) => {
        socket.emit('server', { msg: 'Hi from server!', id: socket.id });
        socket.on('join', (msg) => {
            console.log(msg);
            app.use((req, res, next) => {
                ip = req.ip;
                next();
            });
            console.log(ip);
            console.log(data);
        });
    });
};

module.exports = { startIo };
