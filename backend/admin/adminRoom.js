const express = require('express');
const db = require('./firebaseconnect/connect')


const app = express()
const router = express.Router()

router.get('admin/rooms/:floorID',(req,res) => {
      const floorID = req.params.floorID;
      const floorRef = db.doc('/dormitory/{floorID}')
      res.send(floorRef);
});

router.delete('admin/rooms/:floorID/:roomID/:studentID', (req, res) => {
      const floorID = req.params.floorID;
      const roomID = req.params.roomID;
      const studentID = req.params.studentID;
      const docRef = db.doc('/dormitory/{floorID}/{roomID}/{studentID}')
      docRef
            .delete()
            if (err) console.error(err);
            else console.log("delete success");
        
});
module.exports = router;