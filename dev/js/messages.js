/* globals $ */

$(() => {
    const $message = $('.flash-message');
    console.log($message.html());
    if ($message.length()) {
        console.log('no msgs');
    }
});
