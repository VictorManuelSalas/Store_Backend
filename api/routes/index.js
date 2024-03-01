const express = require('express')
const test = require('./test')

function routerApi(app){
    const router = express.Router()
    app.use('/api/v1',router)
    router.use('/test', test)
}


module.exports = routerApi