const showAllBooksOfAuthor = (req, res, data) => {
    data.authors.aggregate({
        $group: { _id: '$author', total_books: { $sum: 1 } },
    }, (err, context) => {
        res.render('author', { context });
    });
};

module.exports = { showAllBooksOfAuthor };
