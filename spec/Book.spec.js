import _ from 'lodash'
import Book from '../src/Book'

expect.extend({
  toHaveSameDataThan (received, argument) {
    const pass = _.isEqual(_.omit(received.toObject(), '_id'),
      _.omit(argument.toObject(), '_id'))
    const message = pass
      ? () => `expected ${received} to have the same data than ${argument}`
      : () => `expected ${received} to not have the same data than ${argument}`
    return { pass, message }
  }
})

describe('Book', () => {
  let book1, text1, book2, text2

  beforeEach(() => {
    book1 = new Book({
      title: 'Les Misérables',
      author: 'Victor Hugo',
      stars: 4.5,
      nbReviews: 1655,
      observation: 'One of my favourites books',
      tags: ['novel', 'french']
    })
    text1 = 'Les Misérables, by Victor Hugo *4.5/1655 One of my favourites' +
      ' books +novel +french'
    book2 = new Book({
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      stars: 4,
      nbReviews: 100,
      tags: ['novel', 'english']
    })
    text2 = 'Harry Potter, by J.K. Rowling *4/100 +novel +english'
  })

  describe('toText', () => {
    it('returns a textual representation of the book', () => {
      expect(book1.toText()).toBe(text1)
    })

    it('shows the priority at the beginning', () => {
      book1.priority = 'A'
      expect(book1.toText()).toBe(`(A) ${text1}`)
    })

    it('shows if the book is downloaded', () => {
      book1.downloaded = true
      expect(book1.toText()).toBe(`. ${text1}`)
    })

    it('does not output a trailing space if there are no tags', () => {
      book2.tags = []
      expect(book2.toText()).toBe('Harry Potter, by J.K. Rowling *4/100')
    })
  })

  describe('fromText', () => {
    it('creates a book from a text line', () => {
      expect(Book.fromText(text1)).toHaveSameDataThan(book1)
    })

    it('creates a book from another text line', () => {
      expect(Book.fromText(text2)).toHaveSameDataThan(book2)
    })

    it('creates a book from another text line', () => {
      book2.priority = 'A'
      expect(Book.fromText(`(A) ${text2}`)).toHaveSameDataThan(book2)
    })

    it('checks if the book has been downloaded', () => {
      book2.downloaded = true
      expect(Book.fromText(`. ${text2}`)).toHaveSameDataThan(book2)
    })
  })
})
