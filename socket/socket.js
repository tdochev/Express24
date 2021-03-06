let io = require('socket.io');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./../config/');

const startIo = (server, app, data) => {
    io = io.listen(server);

    io.use(passportSocketIo.authorize({
        secret: 'H@ck Th1$',
        store: new MongoStore({ url: config.sessionStoreConnectionString }),
        cookieParser: cookieParser,
    }));

    io.on('connection', (socket) => {
        socket.emit('chat', {
            msg: 'Hi from server!',
            id: socket.id,
            sender: 'Express-24',
        });
        socket.on('chat', (msg) => {
            const user = socket.request.user.username || 'anonymous';
            io.emit('chat', { msg: msg, id: socket.id, sender: user });
        });
    });
};

module.exports = { startIo };
