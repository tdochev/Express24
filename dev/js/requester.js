/* globals $ */

// eslint-disable-next-line no-unused-vars
const jsonRequester = (() => {
    function send(method, url, options) {
        options = options || {};

        const headers = options.headers || {};
        const data = options.data || undefined;

        const promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: method,
                contentType: 'application/json',
                headers: headers,
                data: JSON.stringify(data),
                success: function(res) {
                    resolve(res);
                },
                error: function(err) {
                    reject(err);
                },
            });
        });
        return promise;
    }

    const get = (url, options) => {
        return send('GET', url, options);
    };

    const post = (url, options) => {
        return send('POST', url, options);
    };

    const put = (url, options) => {
        return send('PUT', url, options);
    };

    const del = (url, options) => {
        return send('POST', url, options);
    };

    return {
        send: send,
        get: get,
        post: post,
        put: put,
        delete: del,
    };
})();
