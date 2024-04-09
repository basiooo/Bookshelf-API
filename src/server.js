const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const server = Hapi.server({
  port: 9000,
  host: '127.0.0.1',
  routes: {
    cors: {
      origin: ['*']
    }
  }
})
server.route(routes)
server.events.on('response', (request) => {
  console.log(`${request.info.remoteAddress} = ${request.method} "${request.url.pathname}" => ${request.response.statusCode}`)
})
module.exports = server
