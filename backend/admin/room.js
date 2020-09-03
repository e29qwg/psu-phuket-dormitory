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

router.get('/student/rooms/:floorId/', async (req, res) => {
      const floorId = req.params.floorId;
      const docRef = db.collection(`${floorId}`);
      const roomRef = await docRef.get()
      let result=[];
      roomRef.forEach(profile=>{
          let profileList={
              profileId : '',
              
          }
          profileList.profileId = profile.id
          Object.assign(profileList, profile.data() )
          result.push(profileList)
          
      })
      res.status(200).send(result);
  });

router.delete('/admin/rooms/:floorId/:roomId/:studentId', (req, res) => {
      try {
            let studentData = {
                  student1: {
                      id: "",
                      name: "",
                      surname: "",
                      nickname:"",
                      tel:""
                  },
                  student2:{
                      id: "",
                      name: "",
                      surname: "",
                      nickname:"",
                      tel:""
                  }
               
            }
            const floorId = req.params.floorId;
            const roomId = req.params.roomId;
            const studentId = req.params.studentId;
            const FieldValue = firestore.firestore.FieldValue;
            if(studentId == "student1"){
                  const docRef = db.doc(`/${floorId}/${roomId}`)
                  const proflieRef = docRef.get();
                  proflieRef.then(proflie=>{
                        var array = Object.values(proflie.data()) 
                        console.log(array)
                        array.find((value,index)=>{
                              console.log(value)
                        })
                  })
            }
            
            // docRef.update({
            //       id:FieldValue.delete(),
            //       name:FieldValue.delete(),
            //       surname:FieldValue.delete()
            // });
            // console.log("delete success");
            // res.status(200).send("delete success");
      } 
      catch (error) {
            console.log(error)
      }
});

app.listen(80, () => console.log('Server is ready!'))
//module.exports = router;