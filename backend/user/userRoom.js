const express = require('express');
const firestore = require('./firebaseconnect/connect')

const db = firestore.firestore;
const app = express()
const router = express.Router()

router.get('admin/rooms/:floorID',(req,res) => {
  
    const floorRef = db.doc('/dormitory/{floorID}')
    res.send(floorRef);
});

router.post('/student/rooms/:floorID/:roomID/:studentID', (req, res) => {
    const docRef = db.doc('/dormitory/{floorID}/{roomID}/{studentID}')
    let data = {}
     data.id = req.body.id
     data.name = req.body.name
     data.surname = req.body.surname

    docRef
    .set(data)
    if (err) console.error(err);
    else console.log("booking success");

});