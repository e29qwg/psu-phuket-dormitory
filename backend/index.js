const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const login = require('./login')
const studentProfile = require('./student/profile')
const studentRoom = require('./student/room')
const staffProfile = require('./staff/profile')
const staffRoom = require('./staff/room')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(login)
app.use('/staff',staffProfile);
app.use('/staff',staffRoom);
app.use('/student',studentProfile);
app.use('/student',studentRoom);

app.listen(80, () => console.log('Server is ready!'))