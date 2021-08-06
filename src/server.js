const express = require('express');
const port = 3000;
const routes = require('./router');
const app = express();

app.use(express.json());

app.use(routes);

app.listen(port, () => {
    console.log(`Servidor iniciado http://localhost:${port}`)
})
