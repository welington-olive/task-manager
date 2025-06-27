const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults()

// Configuração do servidor
const PORT = process.env.PORT || 3001

// Middlewares
server.use(middlewares)
server.use(jsonServer.bodyParser)

// Configuração de CORS para permitir acesso do app
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// Rotas customizadas se necessário
server.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Task Manager API is running' })
})

// Usar o router do json-server
server.use('/api', router)

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on port ${PORT}`)
  console.log(`📱 API URL: http://localhost:${PORT}/api`)
  console.log(`🔗 Tasks endpoint: http://localhost:${PORT}/api/tasks`)
}) 