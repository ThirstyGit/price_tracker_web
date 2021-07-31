const express = require('express');

const app = express();

// app configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.NODE_PORT || 3333;

app.get('/', (req, res) => {
    res.send('ki obostha?');
});

// redirecting every other requests as error
app.use((req, res) => {
    res.status(404).send('lost in the jungle of binary bits? 404_ERROR_NOT_FOUND')
});

app.listen(PORT, () => {
    console.log(`Alive @ localhost:${PORT}`);
});
