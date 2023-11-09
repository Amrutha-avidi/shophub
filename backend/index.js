const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const register= require('./routes/register')
const login= require('./routes/login')


require("dotenv").config()

const app = express()
app.use(express.json())

app.use(cors())
app.use('/api/register',register)
app.use('/api/login',login)


app.get('/',(req,res)=>{
    res.send('welcome')
})

  

const port = process.env.PORT || 3001
const uri = process.env.DB_URI


app.listen(port,console.log("listening on 3001"))

mongoose.connect(uri,{
    useNewUrlParser:true,
})
.then(()=>console.log('MongoDB connected successfully'))
.catch((err)=>console.log('mongodb connection failed',err.message))
