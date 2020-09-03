const firestore = require('./config/firebase')

const ref = firestore.firestore().collection('floorA')

const get = async () => {
    const data = await ref.get()
    data.forEach(_ => console.log(_.id, "=>", _.data()))
}
get()

// const set = async () => {
//     (await ref.where("test", "==", "test").get()).forEach(v => console.log(v.data()))
// }
// set()