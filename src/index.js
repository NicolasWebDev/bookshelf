import 'babel-polyfill'
import mongoose from 'mongoose'
import repl from 'repl'
import Book from './Book'

const main = async () => {
  await mongoose.connect('mongodb://localhost/bookshelf')
}

main()
  .then(() => { console.log() }, error => { console.log(error) })
  .then(() => {
    repl.start({ useGlobal: true }).context.Book = Book
  })
