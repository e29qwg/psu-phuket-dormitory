require('tls').DEFAULT_MIN_VERSION = 'TLSv1'   // since TLSv1.3 default disable v1.0 
const cors = require('cors')
const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser')
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
const app = express()
const router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }), router)
app.use(bodyParser.json, router)

router
    .route('/')
    .get((req, res) => {
        res.send('Get')
        console.log(req)
    })
    .post((req, res) => {
 
        soap.createClient(url, (err, client) => {
            if (err) console.error(err);
            else {
                let user = {}
                user.username = req.body.username
                user.password = req.body.password

                client.GetUserDetails(user, function (err, response) {
                    if (err) console.error(err);
                    else {
                        console.log(response);
                        res.send(response)
                    }
                });
            }
        });
    })

// module.exports = router
app.listen(80, () => console.log('Server is ready!'))