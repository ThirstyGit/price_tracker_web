const express = require('express');

const app = express();

// app configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.NODE_PORT || 3333;

app.use('/', (req, res) => {
    res.status(200).send('ki obosthaaa?')
});

app.listen(PORT, () => {
    console.log(`Alive @ localhost:${PORT}`);
})
