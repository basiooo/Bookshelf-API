const { ObjectNotFound } = require('../exceptions')
const books = require('../models/books')

class BookRepository {
  constructor () {
    this.books = books
  }

  getBooks (filters) {
    let bookList = this.books
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'name') {
        bookList = bookList.filter(book => book.name.toLowerCase().includes(value.toLowerCase()))
        return
      }
      bookList = bookList.filter(book => book[key] === value)
    })
    return bookList.map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }
    })
  }

  getBook (id) {
    const bookIndex = this.books.findIndex((book) => book.id === id)
    if (bookIndex === -1) {
      throw new ObjectNotFound(`Book with id ${id} not found.!`)
    }
    return { book: books[bookIndex], bookIndex }
  }

  addBook (book) {
    this.books.push(book)
    return book
  }

  deleteBook (id) {
    const { bookIndex } = this.getBook(id)
    const deleted = this.books.splice(bookIndex, 1)
    return deleted.length !== 0
  }

  updateBook (id, bookData) {
    const { bookIndex } = this.getBook(id)
    const book = books[bookIndex] = {
      ...books[bookIndex],
      ...bookData
    }
    return book
  }
}

module.exports = BookRepository
