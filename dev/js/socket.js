/* globals $, io, chatMessage,  */

$(() => {
    const socket = io.connect('//' + window.location.host);
    socket.on('connect', (data) => {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('chat', (data) => {
        chatMessage.receive(data);
    });

    $('#btn-chat').click(() => {
        const $input = $('#btn-input');
        const msg = $input.val();
        $input.val('');
        socket.emit('chat', msg);
    });
});
