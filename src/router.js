const express = require('express');

const routes = express.Router();

const obras = require('./controller/obras')

routes.get('/obras', obras.list)

module.exports = routes; 


 