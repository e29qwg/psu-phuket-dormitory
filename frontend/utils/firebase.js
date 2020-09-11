import firebase from 'firebase'
import 'firebase/app'
import 'firebase/firestore'
import config from './config'

if (!firebase.app.length) {
    firebase.initializeApp(config)
}

export default firebase