class ObjectNotFound extends Error {
  constructor (message) {
    super(message)
    this.name = 'ObjectNotFound'
  }
}

module.exports = ObjectNotFound

class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
  }
}

module.exports = { ObjectNotFound, ValidationError }
