const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const movieRouter = require('./routes/movies')

app.use(express.json());
app.use(cors());
app.use('api/v1/movies', movieRouter)

app.use(express.static(path.join(__dirname,'../reactjs/build')))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'))
})

const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Database Connection Successful'))

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})