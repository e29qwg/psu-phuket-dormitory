const express = require('express');
const firestore = require('../config/firebase')
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const { query } = require('express');

const db = firestore.firestore()
const app = express()
const router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(bodyParser.json(), router)

router.get('/admin/profile', async (req, res) => {
    try {
        const docRef = db.doc('/students/data');
        docRef.get().then((users => {
            res.send(users.data())       
        }))
    }
    catch (error) {
        console.log(error)
    }
});
router.get('/admin/profile/:id', async (req, res) => {
    try {
        const id = req.params.id
        const docRef = db.doc('/students/data');
        docRef.get().then((users => {
            const result = users.data()
            res.send(result)
        }))
    }
    catch (error) {
        console.log(error)
    }
});
app.listen(80, () => console.log('Server is ready!'))