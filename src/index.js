const server = require('./server')

const init = async () => {
  await server.start()

  console.log(`server berjalan di ${server.info.uri}`)
}

init()
