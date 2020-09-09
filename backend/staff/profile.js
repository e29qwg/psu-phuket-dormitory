const express = require('express');
const firestore = require('../configs/firebase')
const cors = require('cors');
const requireJWTAuth = require("../configs/jwt")
const db = firestore.firestore()
const app = express()
const router = express.Router()

app.use(cors())
app.use(router)

router.get('/staff/profile/:studentId',requireJWTAuth,async (req, res) => {
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