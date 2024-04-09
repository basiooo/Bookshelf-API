const { ValidationError, ObjectNotFound } = require('../exceptions')
const status = require('http-status')

const responseBody = ({ status = 'success', message = null, data = null }) => {
  return {
    status,
    ...(message !== null && { message }),
    ...(data !== null && { data })
  }
}

const handleResponse = (h, body, responseCode) => {
  return h.response(responseBody(body)).code(responseCode)
}

const handleError = (h, error, NotFoundMessage = error.message) => {
  if (error instanceof ValidationError) {
    return handleResponse(h, { status: 'fail', message: error.message }, status.BAD_REQUEST)
  } else if (error instanceof ObjectNotFound) {
    return handleResponse(h, { status: 'fail', message: NotFoundMessage }, status.NOT_FOUND)
  } else {
    return handleResponse(h, responseBody({ status: 'fail', message: 'Terjadi kesalahan server' }), status.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  handleResponse,
  handleError
}
