require('tls').DEFAULT_MIN_VERSION = 'TLSv1'   // since TLSv1.3 default disable v1.0 
const express = require('express');
const bodyParser = require('body-parser')
const soap = require('soap');
const { userUsecase } = require('./usecase/userUsecase')


const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
const app = express()
const router = express.Router()

// const cors = require('cors')
// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }), router)
// app.use(bodyParser.json, router)

router
    .route('/')
   
    .post((req, res) => {

        soap.createClient(url, (err, client) => {
            if (err) console.error(err);
            else if(req.body.type!==undefined){
                console.log(req.body.type)
                if(req.body.username==undefined&&req.body.password!==undefined){
                    res.send("กรุณาใส่ ID");
                }
                else if(req.body.username!==undefined&&req.body.password==undefined){
                    res.send("กรุณาใส่ Password");
                }
                else if(req.body.username==undefined&&req.body.password==undefined){
                    res.send("กรุณาใส่ ID และ Password");
                }
                else {
                    let user = {}
                    user.username = req.body.username
                    user.password = req.body.password
                    user.type = req.body.type
                    console.log(user)
    
                    client.GetUserDetails(user, function (err, response) {
                        if (err) console.error(err);
                        else {
                            console.log(response);
                            const responseData = {
                                role: userUsecase.getRole(response)
                            }
                            console.log(responseData)
                            if(user.type=='Students'){
                                if(user.type==responseData.role){
                                    res.send({
                                        login:true,
                                        type:responseData.role
                                    })
                                }
                                else{
                                    res.send("คุณไม่ใช่นักศึกษา");
                                }
                            }
                            else if(user.type=="Staffs"){
                                if(user.type==responseData.role){
                                    res.send({
                                        login:true,
                                        type:responseData.role
                                    })
                                }
                                else{
                                    res.send("คุณไม่ใช่เจ้าหน้าที่");
                                }
                            }
                        }
                    });
                }
            }
            else if(req.body.type==undefined){
                res.send("กรุณาเลือกสถานะ");
            }
            
           
        });
    })

module.exports = router
// app.listen(80, () => console.log('Server is ready!'))
