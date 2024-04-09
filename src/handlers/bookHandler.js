const BookService = require('../services/bookService')
const { handleError, handleResponse } = require('./utils')
const status = require('http-status')

const bookService = new BookService()

const getBooks = (request, h) => {
  try {
    const query = request.query
    const books = bookService.getBooks(query)
    return handleResponse(h, {
      data: {
        books
      }
    }, status.OK)
  } catch (error) {
    return handleError(h, error)
  }
}

const getBook = (request, h) => {
  try {
    const { id } = request.params
    const book = bookService.getBook(id)
    return handleResponse(h, {
      data: {
        book
      }
    }, status.OK)
  } catch (error) {
    return handleError(h, error, 'Buku tidak ditemukan')
  }
}
const deleteBook = (request, h) => {
  try {
    const { id } = request.params
    const deleted = bookService.deleteBook(id)
    const responseBody = deleted
      ? { message: 'Buku berhasil dihapus' }
      : { status: 'fail', message: 'Buku gagal dihapus.' }
    const responseCode = deleted ? status.OK : status.NOT_FOUND

    return handleResponse(h, responseBody, responseCode)
  } catch (error) {
    return handleError(h, error, 'Buku gagal dihapus. Id tidak ditemukan')
  }
}

const addBook = (request, h) => {
  try {
    const { payload } = request
    const { bookId } = bookService.addBook(payload)
    return handleResponse(h, {
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId
      }
    }, status.CREATED)
  } catch (error) {
    return handleError(h, error)
  }
}
const editBook = (request, h) => {
  try {
    const { payload } = request
    const { id } = request.params
    const { bookId } = bookService.updateBook(id, payload)
    return handleResponse(h, {
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        bookId
      }
    }, status.OK)
  } catch (error) {
    return handleError(h, error, 'Gagal memperbarui buku. Id tidak ditemukan')
  }
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  editBook
}
