const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()
const userRoute = require('./routes/users')
const connection = require('./db/connection')
connection()
const port = process.env.PORT
app.use(userRoute);
// console.log = console.trace;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})