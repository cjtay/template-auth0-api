exports.getUser = (req, res) => {
    res.json('This is a data from API');
};

exports.manageUser = (req, res) => {
    res.json({ name: 'Tay', message: 'do things in controller' });
};
