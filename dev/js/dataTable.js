/* globals $, */

$(() => {
    // eslint-disable-next-line new-cap
    $('#example').DataTable({
        ajax: {
            url: 'api/bookshelf',
            dataSrc: 'bookshelf',
        },
        columns: [
            { data: '_id' },
            { data: 'bookId' },
            { data: 'title' },
            { data: 'isbn' },
            { data: 'author' },
            { data: 'bookFormatType' },
            { data: 'numberOfPages' },
        ]
    });
});
