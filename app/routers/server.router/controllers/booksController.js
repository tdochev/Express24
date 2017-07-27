const showById = (req, res, data) => {
    const id = req.params.id;
    data.books.filterBy({ bookId: id }).then((context) => {
        res.send(context);
    });
};

const showAll = (req, res, data) => {
    data.books.getAll().then((context) => {
        res.render('books', { context });
    });
};

module.exports = { showById, showAll };
