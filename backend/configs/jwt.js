const jwt = require('jsonwebtoken');
const fs = require('fs')
const firebase = require('./firebase')
const tokenRef = firebase.firestore().collection('token')
const db = firebase.firestore()
const privateKey = fs.readFileSync('./configs/private.pem', 'utf8');

const createToken = async (user, responseData, _req, res) => {
      const docRef = db.collection('token');
      const haveToken = await docRef.where('id', '==', `${responseData.userId}`).get();
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

            } catch (e) {
                  console.error(e)
            }
      }
      else {
            res.status(401).send('invalid id or password')
      }
}

const verifyHeader = async (req, res, next) => {
      if (req.headers.authorization) {
            const tokenReceive = req.headers.authorization
            const token = tokenReceive.slice(7)
            const verifyHeaderToken = await tokenRef.where('token', '==', token).get()
            let isExpToken = {}
            const decode = jwt.decode(token, privateKey)
            if (!verifyHeaderToken.empty) {
                  verifyHeaderToken.forEach(result => isExpToken = { ...result.data() })
            } else {
                  res.status(401).send('Not authorization')
            }
            if (decode.exp > Date.now()) {
                  res.status(401).send('token expired')
            }
      } else {
            res.status(401).send('Please Login')
      }
      // console.log(tokenReceive)
}

module.exports = {
      verifyHeader,
      createToken
}
// const privateKey = fs.readFileSync('./private.pem', 'utf8');
// const path = require('path')
// const key_dir = path.join(path.resolve(__dirname), './')
// const public_key = fs.readFileSync(path.join(key_dir, 'private.pem'))
// //ใช้ในการ decode jwt ออกมา
// const ExtractJwt = require("passport-jwt").ExtractJwt
// //ใช้ในการประกาศ Strategy
// const JwtStrategy = require("passport-jwt").Strategy
// // let privateKey = fs.readFileSync('./private.pem', 'utf8');
// const SECRET = public_key
// //สร้าง Strategy
// const jwtOptions = {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: SECRET,
// }
// const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
//       done(null, true)
// })
// //เสียบ Strategy เข้า Passport
// passport.use(jwtAuth)
// //ทำ Passport Middleware
// module.exports = passport.authenticate("jwt", { session: false })
