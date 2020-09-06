const express = require('express');
const firestore = require('../config/firebase')
const cors = require('cors');
const bodyParser = require('body-parser');

const db = firestore.firestore()
const app = express()
const router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

router.get('/profile/:studentId',async (req, res) => {
    try {
        const studentId = req.params.studentId
        const docRef = db.collection('students').doc(`${studentId}`);
        const profile = await docRef.get();
        res.status(200).send(profile.data());
    }
    catch (error) {
        console.log(error)
    }
});

module.exports = router;