const express = require('express');

const routes = express.Router();

const oFirebase = require('../model/firebase/setData')

const obras = require('./controller/obras')

routes.get('/obras', obras.list)

routes.post('/save', (req, res)=>{
    oFirebase.saveData(req.body, (err, data)=>{
        res.send(data)
    })
})

module.exports = routes; 


 