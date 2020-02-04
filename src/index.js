const express = require('express')
const app = express()
// const { auth } = require('./utils/auth')
const { routes } = require('./routes/index')

app.use(express.json())
// app.use(auth)
app.use(routes)

app.listen(3333, () => console.log('Rodando'))