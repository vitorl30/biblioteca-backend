const express = require('express');

const routes = express.Router();

const oFirebase = require('./model/setData')

const obras = require('./controller/obras')

routes.get('/obras', obras.list)
routes.post('/obras', obras.create)

routes.get('/obras/:id', obras.obra)
routes.put('/obras/:id', obras.edit)

routes.delete('/obras/:id', obras.remove)



module.exports = routes; 


 