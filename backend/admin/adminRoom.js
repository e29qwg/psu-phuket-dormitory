const express = require('express');
const firestore = require('./firebaseconnect/connect')

const db = firestore.firestore;
const app = express()
const router = express.Router()

router.get('admin/rooms/:floorID',(req,res) => {
  
      const floorRef = db.doc('/dormitory/{floorID}')
      res.send(floorRef);
});

router.delete('admin/rooms/:floorID/:roomID/:studentID', (req, res) => {
 
        const docRef = db.doc('/dormitory/{floorID}/{roomID}/{studentID}')
        docRef
        .delete()
        if (err) console.error(err);
        else console.log("delete success");
        
});