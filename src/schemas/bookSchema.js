const Joi = require('joi')

const bookSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Mohon isi nama buku',
    'string.required': 'Mohon isi nama buku'
  }),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number().integer().min(1),
  readPage: Joi.number().integer().max(Joi.ref('pageCount')).message({
    'number.max': 'readPage tidak boleh lebih besar dari pageCount'
  }),
  reading: Joi.boolean()
})
module.exports = bookSchema
