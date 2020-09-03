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

router.get('/admin/profile/:id', async (req, res) => {
    try {
        const id = req.params.id
        const docRef = db.collection('students');
        const snapshot =await docRef.where("profile","==",`${id}`).get()
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }  
          
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
          });
    }
    catch (error) {
        console.log(error)
    }
});
app.listen(80, () => console.log('Server is ready!'))