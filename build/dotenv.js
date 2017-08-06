var fs = require('fs')
var dotenv = require('dotenv')
var assign = require('lodash.assign')
var path = require('path')

var env = assign(
    dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../env/base.env'))),
    dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../env/' + (process.env.APP_ENV || 'dev') + '.env')))
)

module.exports = env
