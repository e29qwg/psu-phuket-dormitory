const jwt = require('jsonwebtoken');
const fs = require('fs')
const firebase = require('./firebase')
const tokenRef = firebase.firestore().collection('token')
const db = firebase.firestore()
const privateKey = fs.readFileSync('./configs/private.pem', 'utf8');

const createToken = async (user, responseData, _req, res) => {
      const docRef = db.collection('token');
      // const haveToken = await docRef.where('id', '==', `${responseData.userId}`).get();
      const payload = {
            id: responseData.userId,
            type: responseData.role,
            exp: Date.now() + (1000 * 60 * 10)
      }

      if (user.type === responseData.role) {

            let encoded = jwt.sign(payload, privateKey, { algorithm: 'HS256' });
            try {

                  const register = docRef.doc(`${responseData.userId}`)
                  await register.set({
                        id: responseData.userId,
                        type: responseData.role,
                        token: encoded
                  });
                  res.status(200).send({
                        id: responseData.userId,
                        type: responseData.role,
                        token: encoded
                  })

                  console.log(`ID => ${payload.id} was Login`)

            } catch (e) {
                  console.error(e)
            }
      }
      else {
            res.status(401).send('invalid id or password')
      }
}

const verifyHeader = async (req, res, next) => {
      try {
            if (req.headers.authorization) {
                  const tokenReceive = req.headers.authorization
                  const token = tokenReceive.slice(7)
                  const verifyHeaderToken = await tokenRef.where('token', '==', token).get()
                  let isExpToken = {}
                  const decode = jwt.decode(token, privateKey)
                  if (!verifyHeaderToken.empty) {
                        await verifyHeaderToken.forEach(result => isExpToken = { ...result.data() })
                  }
                  if (isExpToken.token !== token) {
                        console.log("Not authorization")
                        res.status(401).send('Not authorization')
                  }
                  if (+decode.exp < Date.now()) {
                        console.log("token expired")
                        res.status(401).send('token expired')
                  }
                  else next()

            } else {
                  console.log("Please Login")
                  res.status(401).send('Please Login')
            }
      } catch (e) {
            console.error(e)
      }
}

module.exports = {
      verifyHeader,
      createToken
}