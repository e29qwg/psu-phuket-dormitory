const express = require('express');
const firestore = require('../config/firebase')
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

const db = firestore.firestore()
const app = express()
const router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(bodyParser.json(), router)

router.get('admin/profile', (req, res) => {
    try{
        const docRef = db.doc('/students/data')
        docRef.get().then() }
    catch{

    }
});
app.listen(80, () => console.log('Server is ready!'))