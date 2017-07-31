const showById = (req, res, data) => {
    const id = req.params.id;
    const user = req.user;
    data.books.getByBookId(id).then((context) => {
        res.render('book', { context, user, messages: req.flash('error') });
    });
};

const showAll = (req, res, data) => {
    const user = req.user;
    data.books.getAll().then((context) => {
        res.render('books', { context, user, messages: req.flash('error') });
    });
};

module.exports = { showById, showAll };
