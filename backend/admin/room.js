const express = require('express');
const firestore= require('../config/firebase')
const cors = require('cors')
const bodyParser = require('body-parser')

const db = firestore.firestore();
const app = express()
const router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(bodyParser.json(), router)

router.get('/admin/rooms/:floorID',(req,res) => {
      const floorID = req.params.floorID;
      const floorRef = db.doc(`/dormitory/${floorID}`)
      floorRef.listCollections().then((floor)=>
      {
            floor.forEach(room=>{   
                  console.log(room.id)
                  room.get().then((student)=>{
                        student.forEach(data=>{
                        console.log(data.data())
                  })     
              })
  
          })
      })
      res.send("floorRef");
});

router.delete('/admin/rooms/:floorID/:roomID/:studentID', (req, res) => {
      try {
            const floorID = req.params.floorID;
            const roomID = req.params.roomID;
            const studentID = req.params.studentID;
            const FieldValue = firestore.firestore.FieldValue;
            const docRef = db.doc(`/dormitory/${floorID}/${roomID}/${studentID}`)
            docRef.update({
                  id:FieldValue.delete(),
                  name:FieldValue.delete(),
                  surname:FieldValue.delete()
            });
            //res.send(res);
            // console.log("delete success");
            // res.status(200).send("delete success");
      } 
      catch (error) {
            console.log(error)
      }
});

app.listen(80, () => console.log('Server is ready!'))
//module.exports = router;