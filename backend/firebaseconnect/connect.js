var admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://psu-phuket-dormitory.firebaseio.com'
  });

module.exports = admin.firestore();

// const firebaseConfig = {
//   apiKey: "AIzaSyACjLfFtGBHKDIFhkn8D1BiWg1d5UvSpJ0",
//   authDomain: "psu-phuket-dormitory.firebaseapp.com",
//   databaseURL: "https://psu-phuket-dormitory.firebaseio.com",
//   projectId: "psu-phuket-dormitory",
//   storageBucket: "psu-phuket-dormitory.appspot.com",
//   messagingSenderId: "968180070889",
//   appId: "1:968180070889:web:19f2e12733b77f62b03378",
//   measurementId: "G-EW1KZ9SVY4"
// };