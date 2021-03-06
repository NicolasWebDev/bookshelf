import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Book from './Book'
import asyncHandler from 'express-async-handler'

const DB_URL = 'mongodb://localhost/bookshelf'
const PORT = 3001

const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: err.message })
}

mongoose.connect(DB_URL)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express()
app.use(bodyParser.json())

app.get(
  '/api/books',
  asyncHandler(async (req, res) => {
    const books = await Book.find()
    res.send({ books })
  })
)

app.post(
  '/api/book',
  asyncHandler(async (req, res) => {
    const { amazonURL } = req.body
    const book = await Book.fromAmazonURL(amazonURL)
    res.json(await book.save())
  })
)

app.put(
  '/api/books/:bookId',
  asyncHandler(async (req, res) => {
    const { priority } = req.body
    const { bookId } = req.params
    const result = await Book.findOneAndUpdate({ _id: bookId }, { priority })
    res.json(result)
  })
)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})
