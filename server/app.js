const express = require('express');
const app = express();
const mainRoute = require('./routes');
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/news', mainRoute);

app.listen(port, () => console.log('listening port: ', port));