const jsonServer = require('json-server')
const server = jsonServer.create()
// ... 

// https://github.com/typicode/lowdb
// maybe we could use lowdb to write .
const router = jsonServer.router('mock.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
console.log('8888')
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Run Auth API Server on https://localhost:${PORT}/`)
})