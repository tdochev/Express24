/* globals $, toastr */

$(() => {
    const $message = $('#flash-message');
    if ($message.length) {
        const msg = $message.html();
        toastr.warning(msg);
    }
});
