const showById = (req, res, data) => {
    const id = req.params.id;
    data.books.filterBy({ bookId: id }).then((context) => {
        res.send(context);
    });
};

const showAll = (req, res, data) => {
    const user = req.user;
    data.books.getAll().then((context) => {
        res.render('books', { context, user, messages: req.flash('error') });
    });
};

module.exports = { showById, showAll };
