const User = require('../models/user');

exports.getUser = async (req, res, next) => {
    try {
        const result = await User.find();
        console.log('user: ', result);
        console.log('User ID: ', req.user.sub);
        res.json(result);
    } catch (err) {
        console.log(err);
    }
};

exports.addUser = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const userData = new User({
        name: name,
        email: email,
    });
    console.log('userData: ', userData);
    try {
        const result = await userData.save();
        console.log('res: ', result);
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(400).json(err.message);
    }
};
