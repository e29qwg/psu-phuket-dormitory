const express = require('express');
const db = require('../firebaseconnect/connect')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(bodyParser.json(), router)


router.get('/admin/rooms/:floorID/:roomID/:studentID',(req,res) => {
      const floorID = req.params.floorID;
      const roomID = req.params.roomID;
      const studentID = req.params.studentID;
      // const floorRef = db.doc(`/dormitory/${floorID}/${roomID}/${studentID}`)
      const floorRef = db.collection('/dormitory')
      floorRef.get().then((doc)=>{console.log(doc)})
      res.send("floorRef");
});

router.delete('/admin/rooms/:floorID/:roomID/:studentID', (req, res) => {
      const floorID = req.params.floorID;
      const roomID = req.params.roomID;
      const studentID = req.params.studentID;
      const docRef = db.doc(`/dormitory/${floorID}/${roomID}/${studentID}`)
      docRef
            .delete()
            if (false) console.error(err);
            else console.log("delete success");
        
});
app.listen(80, () => console.log('Server is ready!'))
//module.exports = router;