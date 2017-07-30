/* globals $ */

// eslint-disable-next-line no-unused-vars
const chatMessage = (() => {
    function receive(data) {
        $(() => {
            const liItem = $('<li>').addClass('left clearfix');
            const header = $('<div>').addClass('header');
            const strong = $('<strong>').addClass('primary-font').html(data.sender);
            const p = $('<p>').html(data.msg);
            header.append(strong);
            liItem.append(header);
            liItem.append(p);
            $('.chat').append(liItem);
            $('.collapse').addClass('collapse in');
        });
    }

    return {
        receive,
    };
})();
