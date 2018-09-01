import 'babel-polyfill'
import express from 'express'
import mongoose from 'mongoose'
import Book from './Book'

const DB_URL = 'mongodb://localhost/bookshelf'
const PORT = 3000

const app = express()

mongoose.connect(DB_URL)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', async (req, res) => {
  const books = await Book.find()
  res.send(books)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
