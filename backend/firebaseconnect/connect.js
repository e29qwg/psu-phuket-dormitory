var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://psu-phuket-dormitory.firebaseio.com'
  });
module.export = admin.firestore();
