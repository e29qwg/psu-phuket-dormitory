require('tls').DEFAULT_MIN_VERSION = 'TLSv1'   // since TLSv1.3 default disable v1.0 
const express = require('express');
const soap = require('soap');
const { userUsecase } = require('./usecase/userUsecase')
const jwt = require("jwt-simple")
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
const router = express.Router()

router.post('/', (req, res) => {
    try {
        soap.createClient(url, (err, client) => {
            let user = {}
            user.username = req.body.username
            user.password = req.body.password
            user.type = req.body.type
    
            client.GetUserDetails(user, function (err, response) {
                const responseData = {
                    userId:userUsecase.getStudentId(response),
                    role: userUsecase.getRole(response)
                }
                const payload = {
                    username: req.body.username ,
                    id: responseData.userId ,
                    type: responseData.role
                }
                const secret = "MY_SECRET_KEY"
                const encoded = jwt.encode(payload,secret,'HS256')
                if(user.type==responseData.role){
                    res.status(200).send({
                        login:true,
                        id: responseData.userId,
                        type:responseData.role,
                        token:encoded
                    })
                }
                else{
                    res.sendStatus(400)
                }
            });         
        }); 
    } catch (error) {
        res.send(error);
    }
 
})

module.exports = router;
// app.listen(80, () => console.log('Server is ready!'))
