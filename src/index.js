import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Book from './Book'

const DB_URL = 'mongodb://localhost/bookshelf'
const PORT = 3001

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(DB_URL)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', async (req, res) => {
  const books = await Book.find()
  res.send({ books })
})

app.post('/book', async (req, res) => {
  const { amazonURL } = req.body
  Book.fromAmazonURL(amazonURL)
  console.log(req.body)
  res.json(req.body)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
