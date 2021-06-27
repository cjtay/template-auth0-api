const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
// import routes
const userRoutes = require('./routes/users');

const app = express();

// ******* SCHEMA ********
const User = require('./models/user');

// ******* MIDDLEWARES ********
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', userRoutes);

// ******* ENDPOINTS ********
app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        return res.status(400).json({ error: err });
    }
});

const port = process.env.PORT;

async function connect() {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(process.env.ATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log('mongodb connected');
    } catch (err) {
        console.log('Mongoose error', err);
    }
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

connect();
