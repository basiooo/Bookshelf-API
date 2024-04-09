const { getBooks, addBook, getBook, deleteBook, editBook } = require('./handlers/bookHandler')
const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getBooks
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBook
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBook
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBook
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook
  }
]

module.exports = routes
