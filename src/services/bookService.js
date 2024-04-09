const { nanoid } = require('nanoid')
const BookRepository = require('../repositories/bookRepository')
const bookSchema = require('../schemas/bookSchema')
const { ValidationError } = require('../exceptions')
class BookService {
  constructor () {
    this.bookRepository = new BookRepository()
  }

  getBooks (query) {
    const allowedFields = ['name', 'finished', 'reading']
    const filteredFields = {}
    allowedFields.forEach(value => {
      if (query[value] === undefined) {
        return
      }
      if (allowedFields.includes(value, 1)) {
        if (['0', '1'].includes(query[value])) {
          filteredFields[value] = query[value] === '1'
        }
        return
      }
      filteredFields[value] = query[value]
    })
    return this.bookRepository.getBooks(filteredFields)
  }

  addBook (bookData) {
    const { error, value } = bookSchema.validate(bookData)
    if (error) {
      throw new ValidationError(`Gagal menambahkan buku. ${error.details[0].message}`)
    }
    const bookId = nanoid()
    const currentTimestamp = new Date().toISOString()
    const finished = value.pageCount === value.readPage
    const book = {
      id: bookId,
      insertedAt: currentTimestamp,
      updatedAt: currentTimestamp,
      finished,
      ...value
    }
    this.bookRepository.addBook(book)
    return { bookId }
  }

  getBook (id) {
    const { book } = this.bookRepository.getBook(id)
    return book
  }

  deleteBook (id) {
    return this.bookRepository.deleteBook(id)
  }

  updateBook (id, bookData) {
    const { error, value } = bookSchema.validate(bookData)
    if (error) {
      throw new ValidationError(`Gagal memperbarui buku. ${error.details[0].message}`)
    }
    const updatedAt = new Date().toISOString()
    const finished = value.pageCount === value.readPage
    const book = { ...value, updatedAt, finished }
    return this.bookRepository.updateBook(id, book)
  }
}

module.exports = BookService
