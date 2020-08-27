const express = require('express');
const firestore = require('./firebaseconnect/connect')

const db = firestore.firestore;
const app = express()
const router = express.Router()

let data = {
    id:"",
    name:"",
    surname:""
}

router.get('student/rooms/:floorID',(req,res) => {
    const floorID = req.params.floorID;
    const floorRef = db.doc('/dormitory/{floorID}')
    res.send(floorRef);
});

router.post('/student/rooms/:floorID/:roomID/:studentID', (req, res) => {
    let student = {};

    const floorID = req.params.floorID;
    const roomID = req.params.roomID;
    const studentID = req.params.studentID;
    const docRef = db.doc('/dormitory/{floorID}/{roomID}/{studentID}')
    
     student.id = req.body.id
     student.name = req.body.name
     student.surname = req.body.surname

    docRef
    .set(student)
    if (err) console.error(err);
    else console.log("booking success");

});
module.exports = router;