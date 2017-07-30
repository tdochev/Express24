/* globals $, */

$(() => {
    // eslint-disable-next-line new-cap
    $('#example').DataTable({
        ajax: {
            url: 'api/bookshelf',
            dataSrc: 'bookshelf',
        },
        columns: [
            { data: 'title' },
            { data: 'isbn' },
            { data: 'author' },
            { data: 'bookFormatType' },
            { data: 'numberOfPages' },
            {
                'render': (data, type, full, meta) => {
                    const removeLink = 'bookShelf/remove/' + full.bookId;
                    return '<a class="btn btn-danger" href=' + removeLink + '>Delete</a>';
                },
            },
        ],
    });
});
