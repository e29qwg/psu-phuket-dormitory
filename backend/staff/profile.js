const express = require('express');
const firestore = require('../config/firebase')
const cors = require('cors');
const bodyParser = require('body-parser');

const db = firestore.firestore()
const app = express()
const router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(bodyParser.json(), router)

router.get('/staff/profile/:studentId',async (req, res) => {
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
app.listen(80, () => console.log('Server is ready!'))