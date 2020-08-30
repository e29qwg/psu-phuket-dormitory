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


const getStudents = async (room) => {
    return await new Promise((resolve, reject) => {
        room.get().then((students)=>{
            let studentsLists = [];
            students.forEach(student=>{
                // console.log(data.data())
                let studentData = {
                    sudentType: student.id
                }

                studentData = Object.assign(studentData, student.data());
                studentsLists.push(studentData);
                
            })
            resolve(studentsLists); 
        })
    })
}

const getRooms = async (floor) => {
    
    let roomsResov = await new Promise(async (resolve, reject) => {
        let rooms = [];
        floor.forEach(async room=>{
            let roomList = {
                roomId: '',
                students: []
            } 
            
            roomList.roomId = room.id;
            // console.log(room.id) 

            let studentResolve = await getStudents(room);
            roomList.students = studentResolve;
            rooms.push(roomList);            
        })

        resolve(rooms)

        // console.log('rooms', rooms)
    });

    console.log('roomsResov', roomsResov);
}


router.get('/student/rooms/:floorID/',(req,res) => {
    const floorID = req.params.floorID;
    const floorRef = db.doc(`/dormitory/${floorID}`)
    
    floorRef.listCollections().then(async (floor)=>
    {
        let rooms = [];

        await getRooms(floor)


        // floor.forEach(async room=>{
        //     let roomList = {
        //         roomId: '',
        //         students: []
        //     } 
            
        //     roomList.roomId = room.id;
        //     // console.log(room.id) 

        //     let studentResolve = await getStudents(room);
        //     roomList.students = studentResolve;
        //     rooms.push(roomList);               
        // })
        // rooms.push(roomList);
        res.send(rooms); 
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