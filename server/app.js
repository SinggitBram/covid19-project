require ('dotenv').config()
const cors = require('cors')
const express = require ('express')
const app = express()
const port = process.env.PORT || 3000
const mainRoute = require('./routes');
const routerUser = require('./routes/userRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/news', mainRoute);
app.use('/users' , routerUser)

app.listen(port, function(){console.log(`listening to port ${port}`)})