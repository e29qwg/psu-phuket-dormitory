const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(require("./login"));

app.listen(80, () => console.log('Server is ready!'))