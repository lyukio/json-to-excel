const alasql = require('alasql')
const data = require('../data/index')
const { flatten } = require('../utils/object')

exports.route_getJSON = async (req, res) => {
    const flattenedData = data.map(item => item = flatten(item))
    alasql('SELECT * INTO XLSX("arquive.xlsx", {headers: true}) FROM ?', [flattenedData]);
    return res.json("deu bom")
}