// backend/index.js
const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
const port = 8081

// Configuración de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite')
})

// Modelo de ejemplo
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

// Sincronizar la base de datos
sequelize.sync()

// Middleware para parsear JSON
app.use(express.json())

// Ruta de ejemplo
app.get('/api/users', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
