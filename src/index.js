import 'babel-polyfill'
import mongoose from 'mongoose'

const openConnection = () => new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost/bookshelf')
  const db = mongoose.connection
  db.on('error', () => {
    reject(new Error('connection error'))
  })
  db.once('open', () => {
    console.log('connected!')
    resolve()
  })
})

const main = async () => {
  await openConnection()
}

main()
  .then(() => {}, error => { console.log(error) })
  .then(() => process.exit())
