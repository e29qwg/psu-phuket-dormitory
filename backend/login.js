const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser')
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';

const app = express()
const router = express.Router()
app.use(bodyParser.urlencoded({ extended: true }), router)
app.use(bodyParser.json, router)

router.route('/')

    .post((req, res) => {
        console.log(req.body)
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
                        res.send(response);
                    }
                });
            }
        });
    })

module.exports = router