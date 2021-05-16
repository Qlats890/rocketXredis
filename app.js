require('dotenv').config()
//package
const express = require('express')
const responseTime = require('response-time')
//folder
const routers = require('./routers')

const port = process.env.PORT_ENTRY || 3001

const app = express()

app.use(responseTime())
app.use('/',routers)

//if route path is not found
app.use((req,res,next)=>{
    res.status(404).json({status: '404 Path Not Found'})
})
app.listen(port,()=>{
    console.log(`Berjalan pada port ${port}`);
})
