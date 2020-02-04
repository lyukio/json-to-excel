const routes = require('express').Router()
const controller = require('../controllers/jsonToExcel')

routes.get('/', controller.route_getJSON)

exports.jsonToExcelRouter = routes