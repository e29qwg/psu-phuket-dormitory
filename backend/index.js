const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const login = require('./login')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(login)

app.listen(80, () => console.log('Server is ready!'))