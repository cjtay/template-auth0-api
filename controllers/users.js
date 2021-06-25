
exports.getUser = (req, res) => {
    res.json({name: 'Tay', age: 50})
}

exports.manageUser = (req, res) => {
    res.json({name: 'Tay', message: 'do things in controller'})
}