const express = require('express');
const db = require('../firebaseconnect/connect')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(bodyParser.json(), router)

router.get('student/rooms/:floorID', (req, res) => {
    const floorID = req.params.floorID;
    const floorRef = db.doc(`/dormitory/${floorID}`)
    res.send(floorRef);
});

router.post('/student/rooms/:floorID/:roomID/:studentID', (req, res) => {
    try {
        let student = {
            id: "",
            name: "",
            surname: ""
        }

        const floorID = req.params.floorID;
        const roomID = req.params.roomID;
        const studentID = req.params.studentID;
        const docRef = db.doc(`/dormitory/${floorID}/${roomID}/${studentID}`)

        student.id = req.body.id
        student.name = req.body.name
        student.surname = req.body.surname

        console.log(student);

        docRef
            .set(student)
            console.log(student);
            res.status(200).send("booking success");
    } catch (error) {
        console.log(error)
    }

});
app.listen(80, () => console.log('Server is ready!'))
// module.exports = router;