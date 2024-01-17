const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 4000 // Assign a default value of 4000 if process.env.PORT is undefined
const {registerNewUser} = require('./controllers/users')
const connection = require('./db/connection')
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', registerNewUser)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    connection();
})