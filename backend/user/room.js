const express = require('express');
const firestore = require('../config/firebase')
const cors = require('cors');
const bodyParser = require('body-parser');

const db = firestore.firestore()
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


router.post('/student/rooms/:floorId/:roomId/:studentId', (req, res) => {
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

        const docRef = db.doc(`/${floorId}/${roomId}`)
        if(studentId == "student1"){
            studentData.student1.id = req.body.id
            studentData.student1.name = req.body.name
            studentData.student1.surname = req.body.surname
            studentData.student1.nickname = req.body.nickname
            studentData.student1.tel = req.body.tel

            docRef.set(studentData)
            res.status(200).send("booking success");
        }
        else if(studentId == "student2"){
            studentData.student2.id = req.body.id
            studentData.student2.name = req.body.name
            studentData.student2.surname = req.body.surname
            studentData.student2.nickname = req.body.nickname
            studentData.student2.tel = req.body.tel

            docRef.set(studentData)
            console.log(studentData);
            res.status(200).send("booking success");
        }
        else{
            console.log("ข้อมูลผิดพลาด")
        }

    } catch (error) {
        console.log(error)
    }

});
app.listen(80, () => console.log('Server is ready!'))
// module.exports = router;