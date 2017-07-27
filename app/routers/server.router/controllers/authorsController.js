const showAll = (req, res, data) => {
    data.authors.getAll().then((context) => {
        res.render('author', { context });
    });
};

module.exports = { showAll };
