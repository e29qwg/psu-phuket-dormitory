const express = require('express');
const db = require('./firebaseconnect/connect')

const app = express()
const router = express.Router()


router.get('student/rooms/:floorID',(req,res) => {
    const floorID = req.params.floorID;
    const floorRef = db.doc('/dormitory/{floorID}')
    res.send(floorRef);
});

router.post('/student/rooms/:floorID/:roomID/:studentID', (req, res) => {
    let students = {
        id:"",
        name:"",
        surname:""
    }

    const floorID = req.params.floorID;
    const roomID = req.params.roomID;
    const studentID = req.params.studentID;
    const docRef = db.doc('/dormitory/{floorID}/{roomID}/{studentID}')
    
     student.id = req.body.id
     student.name = req.body.name
     student.surname = req.body.surname
     students.push(student)

    docRef
    .set(students)
    if (err) console.error(err);
    else console.log("booking success");

});
module.exports = router;