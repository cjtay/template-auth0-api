const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('hello from node');
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
