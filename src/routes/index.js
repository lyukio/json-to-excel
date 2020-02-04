const express = require('express')
const { jsonToExcelRouter } = require('./jsonToExcel')

const app = express()

app.use('/jsonToExcel', jsonToExcelRouter)

exports.routes = app