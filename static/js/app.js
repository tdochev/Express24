'use strict';

/* globals $, */

$(function () {
    // eslint-disable-next-line new-cap
    $('#example').DataTable({
        ajax: {
            url: 'api/bookshelf',
            dataSrc: 'bookshelf'
        },
        columns: [{ data: 'title' }, { data: 'isbn' }, { data: 'author' }, { data: 'bookFormatType' }, { data: 'numberOfPages' }, {
            'render': function render(data, type, full, meta) {
                var removeLink = 'bookShelf/remove/' + full.bookId;
                return '<a class="btn btn-danger" href=' + removeLink + '>Delete</a>';
            }
        }]
    });
});

/* globals $, toastr */

$(function () {
    var $message = $('#flash-message');
    if ($message.length) {
        var msg = $message.html();
        toastr.warning(msg);
    }
});

/* globals $ */

// eslint-disable-next-line no-unused-vars
var jsonRequester = function () {
    function send(method, url, options) {
        options = options || {};

        var headers = options.headers || {};
        var data = options.data || undefined;

        var promise = new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                method: method,
                contentType: 'application/json',
                headers: headers,
                data: JSON.stringify(data),
                success: function success(res) {
                    resolve(res);
                },
                error: function error(err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    var get = function get(url, options) {
        return send('GET', url, options);
    };

    var post = function post(url, options) {
        return send('POST', url, options);
    };

    var put = function put(url, options) {
        return send('PUT', url, options);
    };

    var del = function del(url, options) {
        return send('POST', url, options);
    };

    return {
        send: send,
        get: get,
        post: post,
        put: put,
        delete: del
    };
}();