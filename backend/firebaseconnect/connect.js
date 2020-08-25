var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://psu-phuket-dormitory.firebaseio.com'
  });
var app = admin.initializeApp();
module.exports = app