const Token = require('./token');

exports.test = (req, res, next) => {
    console.log("entrou no middleware test")
    next()
}