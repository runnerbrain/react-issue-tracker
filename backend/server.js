const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.APP_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully...");
})

const issuesRouter = require('./routes/issues');
app.use('/issues',issuesRouter);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});