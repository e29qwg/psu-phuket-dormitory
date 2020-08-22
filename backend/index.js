const express = require('express');
const app = express();

app.use(require("./login"));

app.listen(80, () => console.log('Server is ready!'))