const express = require('express');
const sessions = require("express-session");
require('dotenv').config(); // Getting all the environment variables.

// app
const app = express();

// routes
const baseRouter = require('./routes/base');
const authRouter = require('./routes/auth');

// app configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up session.
app.use(sessions({
    secret: process.env.SESSION_SECRET, // Need a better secret key.
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1 // 1 hour
    }
}));

// All routes for our website.
app.use('/', baseRouter);
app.use('/auth', authRouter);

// redirecting every other requests as error
app.use((req, res) => {
    res.status(404).send('lost in the jungle of binary bits? 404_ERROR_NOT_FOUND')
});


// Listen @ designated port
const PORT = process.env.NODE_PORT || 3333;
app.listen(PORT, () => {
    console.log(`Alive @ localhost:${PORT}`);
});
