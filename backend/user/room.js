const express = require('express');
const firestore = require('../config/firebase')
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

const db = firestore.firestore()
const app = express()
const router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(bodyParser.json(), router)


const getStudents = async room => {
    let studentsLists =[];
    return  await new Promise((resolve, reject) => {
        room.get().then((students) => {
            students.forEach(async student => {
                let studentData = {
                    studentType: student.id,
                }
                let studentResult = await Object.assign(studentData, student.data());
                studentsLists.push(studentResult);     
            })  
            resolve(studentsLists);
        })
    })
}


const getRooms = (floor) => {
    let rooms = [];
    return  new Promise( (resolve, reject) => {
        floor.forEach(async room => {
            let roomList = {
                roomId: room.id,
                students:[]
            }
            roomList.students = await getStudents(room);
            rooms.push(roomList);
            console.log(roomList)   
        })     
        resolve(rooms)
    });
}


router.get('/student/rooms/:floorID/',(req, res) => {
    const floorID = req.params.floorID;
    const floorRef = db.doc(`/dormitory/${floorID}`)
    floorRef.listCollections().then(async (floor)=>{
        await getRooms(floor); 
    })
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