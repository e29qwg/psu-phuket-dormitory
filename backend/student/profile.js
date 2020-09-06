const express = require('express');
const firestore = require('../configs/firebase')
const cors = require('cors');
const bodyParser = require('body-parser');

const db = firestore.firestore()
const app = express()
const router = express.Router()
const jwt = require("jwt-simple")
app.use(cors())
app.use(router)
const requireJWTAuth = require("../configs/jwt")

router.get('/profile/:studentId',requireJWTAuth,async (req, res) => {
    try {
        const studentId = req.params.studentId
        const docRef = db.collection('students').doc(`${studentId}`);
        const profile = await docRef.get();
        res.status(200).send(profile.data());
    }
    catch (error) {
        console.log(error)
    }
});


router.post('/profile/:studentId',requireJWTAuth, (req, res) => {
    try {
        const user={
            profile:{
                id: "",
                name: "",
                surname: "",
                nickname:"",
                religion:"",
                race:"",
                nationality:"",
                birthday:"",
                faculty:"",
                department:"",
                line:""
            },
            contact:{
                tel:"",
                network:"",
                email:"",
                facebook:"",
                houseno:"",
                village:"",
                villageno:"",
                road:"",
                subdistrict:"",
                district:"",
                province:"",
                postalcode:""

            },
            infomation:{
                school:"",
                county:"",
                gpa:"",
                plan:"",
                height:"",
                weight:"",
                blood:"",
                disease:"",
                drugallergy:""
            },
            friend:{
                name: "",
                surname: "",
                nickname:"",
                tel:"",
                faculty:"",
                department:""
            },
            family:{
                dad:{
                    name:"",
                    surname:"",
                    age:"",
                    career:"",
                    workplace:"",
                    position:"",
                    income:"",
                    tel:"",
                    network:"a"
                },
                mom:{
                    name:"",
                    surname:"ขุ",
                    age:"",
                    career:"",
                    workplace:"",
                    position:"",
                    income:"",
                    tel:"",
                    network:""
                },
                emergency:{
                    name:"",
                    surname:"",
                    age:"",
                    concerned:"",
                    career:"",
                    tel:"",
                    network:""
                },
                status:""
            },
            other:{
                talent:"",
                character:"",
                position:""
            }
        }
        //profile
        user.profile.id = req.body.profile.id;
        user.profile.name = req.body.profile.name;
        user.profile.surname = req.body.profile.surname;
        user.profile.nickname = req.body.profile.nickname;
        user.profile.religion = req.body.profile.religion;
        user.profile.race = req.body.profile.race;
        user.profile.nationality = req.body.profile.nationality;
        user.profile.birthday = req.body.profile.birthday;
        user.profile.faculty = req.body.profile.faculty;
        user.profile.department = req.profile.body.department;
        user.profile.line = req.body.profile.line;

        //contact
        user.contact.tel = req.body.contact.tel
        user.contact.network = req.body.contact.network
        user.contact.email = req.body.contact.email
        user.contact.facebook = req.body.contact.facebook
        user.contact.houseno = req.body.contact.houseno
        user.contact.village = req.body.contact.village
        user.contact.villageno = req.body.contact.villageno
        user.contact.road = req.body.contact.road
        user.contact.subdistrict = req.body.contact.subdistrict
        user.contact.district = req.body.contact.district
        user.contact.province = req.body.contact.province
        user.contact.postalcode = req.body.contact.postalcode

        //information
        user.infomation.school = req.body.infomation.school
        user.infomation.county = req.body.infomation.county
        user.infomation.gpa = req.body.infomation.gpa
        user.infomation.plan = req.body.infomation.plan
        user.infomation.height = req.body.infomation.height
        user.infomation.weight = req.body.infomation.weight
        user.infomation.blood = req.body.infomation.blood
        user.infomation.disease = req.body.infomation.disease
        user.infomation.drugallergy = req.body.infomation.drugallergy
        
        //friend
        user.friend.name = req.body.friend.name
        user.friend.surname = req.body.friend.surname
        user.friend.nickname = req.body.friend.nickname
        user.friend.tel = req.body.friend.tel
        user.friend.faculty = req.body.friend.faculty
        user.friend.department = req.body.friend.department

        //family/dad
        user.family.dad.name = req.body.family.dad.name
        user.family.dad.surname = req.body.family.dad.surname
        user.family.dad.age = req.body.family.dad.age
        user.family.dad.career = req.body.family.dad.career
        user.family.dad.workplace = req.body.family.dad.workplace
        user.family.dad.position = req.body.family.dad.position
        user.family.dad.income = req.body.family.dad.income
        user.family.dad.tel = req.body.family.dad.tel
        user.family.dad.network = req.body.family.dad.network

        //family/mom
        user.family.mom.name = req.body.family.mom.name
        user.family.mom.surname = req.body.family.mom.surname
        user.family.mom.age = req.body.family.mom.age
        user.family.mom.career = req.body.family.mom.career
        user.family.mom.workplace = req.body.family.mom.workplace
        user.family.mom.position = req.body.family.mom.position
        user.family.mom.income = req.body.family.mom.income
        user.family.mom.tel = req.body.family.mom.tel
        user.family.mom.network = req.body.family.mom.network

        //family/emergency
        user.family.emergency.name = req.body.family.emergency.name
        user.family.emergency.surname = req.body.family.emergency.surname
        user.family.emergency.age = req.body.family.emergency.age
        user.family.emergency.concerned = req.body.family.emergency.concerned
        user.family.emergency.career = req.body.family.emergency.career
        user.family.emergency.tel = req.body.family.emergency.tel
        user.family.emergency.network = req.body.family.emergency.network

        //family/status
        user.family.status = req.body.family.status

        //other
        user.other.talent = req.body.other.talent
        user.other.character = req.body.other.character
        user.other.position = req.body.other.position

        const studentId = req.params.studentId;
        const docRef = db.collection('students').doc(`${studentId}`)
        docRef.set(user)   
        res.status(200).send("add profile success");
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;