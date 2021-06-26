const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// import routes
const userRoutes = require('./routes/users');

const app = express();

// middleware
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    })
);

app.use('/api', userRoutes);

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
