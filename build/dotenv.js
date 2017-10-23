'use strict'

const fs = require('fs')
const dotenv = require('dotenv')
const path = require('path')

const env = dotenv.parse(
    fs.readFileSync(
        path.resolve(__dirname, '../env/' + (process.env.APP_ENV || 'dev') + '.env')
    )
)

module.exports = env
