const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://psu-phuket-dormitory.firebaseio.com'
});
// admin.firestore().doc('dormitory/floorA/roomA01/student1').get().then((val) => console.log(val.data()))
module.exports = admin.firestore();