import Book from '../src/Book'

describe('Book', () => {
  describe('toText', () => {
    let book

    beforeEach(() => {
      book = new Book({
        title: 'Les Misérables',
        author: 'Victor Hugo',
        stars: 4.5,
        nbReviews: 1655,
        observation: 'One of my favourites books',
        tags: ['novel', 'french']
      })
    })

    it('returns a textual representation of the book', () => {
      expect(book.toText())
        .toBe('Les Misérables, by Victor Hugo *4.5/1655 One of my favourites' +
          ' books +novel +french')
    })

    it('shows the priority at the beginning', () => {
      book.priority = 'A'
      expect(book.toText())
        .toBe('(A) Les Misérables, by Victor Hugo *4.5/1655' +
          ' One of my favourites books +novel +french')
    })

    it('shows if the book is downloaded', () => {
      book.downloaded = true
      expect(book.toText())
        .toBe('. Les Misérables, by Victor Hugo *4.5/1655' +
          ' One of my favourites books +novel +french')
    })
  })
})
