const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/covidroutes')
require('dotenv').config()
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/covid', route)

app.get('/', (req, res) => {
    res.send('jello')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))