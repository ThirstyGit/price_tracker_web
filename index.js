const express = require('express');

// app
const app = express();

// routes
const baseRouter = require('./routes/base');

// app configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', baseRouter);

// redirecting every other requests as error
app.use((req, res) => {
    res.status(404).send('lost in the jungle of binary bits? 404_ERROR_NOT_FOUND')
});


// Listen @ designated port
const PORT = process.env.NODE_PORT || 3333;
app.listen(PORT, () => {
    console.log(`Alive @ localhost:${PORT}`);
});
