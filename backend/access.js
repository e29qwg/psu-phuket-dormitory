require('tls').DEFAULT_MIN_VERSION = 'TLSv1'   // since TLSv1.3 default disable v1.0 
const express = require('express');
const soap = require('soap');
const { userUsecase } = require('./usecase/userUsecase')
const jwt = require('jsonwebtoken');
const fs = require('fs')
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
const router = express.Router()
const firestore = require('./configs/firebase')
const db = firestore.firestore()
const { createToken } = require('./configs/jwt')


//remove token
router.delete('/logout/:token', async (req, res) => {
    const token = req.params.token
    const docRef = db.collection('token')
    const find = await docRef.where('token', "==", token).get()
    let deleteId = {}
    
    try {
        if (!find.empty) {
            find.forEach(res => deleteId = { ...res.data() })
        }
        docRef.doc(deleteId.id).delete()
    } catch (e) {
        console.log(e)
    }

router.delete('/logout/:id', (req, res) => {
    const id = req.params.id
    const docRef = db.collection('token').doc(`${id}`)
    docRef.delete()
    res.status(200).send("logout success");
    res.redirect('/');
});

//create token
router.post('/', (req, res) => {
    try {
        soap.createClient(url, (err, client) => {
            let user = {}
            user.username = req.body.username
            user.password = req.body.password
            user.type = req.body.type
            client.GetUserDetails(user, async function (err, response) {
                try {
                    
                    const responseData = {

                        userId: userUsecase.getStudentId(response),
                        role: userUsecase.getRole(response)
                    }
                    if (responseData.userId === null && responseData.role === null) {
                        res.status(400).send("ID หรือ Password ผิด");
                    } else {
                        if (user.type == responseData.role) {
    
                            let oldToken = []
                            const payload = {
                                id: responseData.userId,
                                type: responseData.role,
                                exp: Date.now() + (1000 * 60 * 10)
                            }
                            let privateKey = fs.readFileSync('./configs/private.pem', 'utf8');
                            let encoded = jwt.sign(payload, privateKey, { algorithm: 'HS256' });
                            const docRef = db.collection('token');
                            const snapshot = await docRef.where('id', '==', `${responseData.userId}`).get();
                            if (snapshot.empty) {
                                const register = docRef.doc(`${responseData.userId}`)
                                await register.set({
                                    login: true,
                                    id: responseData.userId,
                                    type: responseData.role,
                                    token: encoded
                                });
                                res.status(201).send({
                                    login: true,
                                    id: responseData.userId,
                                    type: responseData.role,
                                    token: encoded
                                })
                            } else {
                                snapshot.forEach(doc => {
                                    oldToken.push(doc.data())
                                });
                                oldToken.find(obj => {
                                    jwt.verify(obj.token, privateKey, { algorithm: "HS256" }, async (err, decoded) => {
                                        if (err) {
                                            res.status(500).json({ error: "Not Authorized" });
                                            throw new Error("Not Authorized");
                                        } else if (parseInt(decoded.exp) > Date.now()) {
                                            res.status(204)
                                        } else {
                                            const register = docRef.doc(`${responseData.userId}`)
                                            await register.set({
                                                login: true,
                                                id: responseData.userId,
                                                type: responseData.role,
                                                token: encoded
                                            });
                                            res.status(201).send({
                                                login: true,
                                                id: responseData.userId,
                                                type: responseData.role,
                                                token: encoded
                                            })
                                        }
                                    });
                                })
                            }
                        }
                        else {
                            res.status(400).send(สถานะไม่ถูกต้อง)
                        }
                    }
                } catch (error) {
                    res.sendStatus(501)
                }
               
            });
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;