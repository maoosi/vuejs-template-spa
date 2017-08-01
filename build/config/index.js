// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var jsyaml = require('js-yaml')
var assign = require('lodash.assign')

// dotenv
var fs = require('fs')
var dotenv = require('dotenv')
var envParams = assign(
    dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../../env/base.env'))),
    dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../../env/' + (process.env.APP_ENV || 'dev') + '.env')))
)
var envParamsStr = []
for (let k in envParams) envParamsStr[k] = '"' + envParams[k] + '"'

// default base.yml locale
var defaultBaseLocale = JSON.stringify(
    jsyaml.load(
        fs.readFileSync(
            path.resolve(__dirname, '../../src/locales/' + envParams.LOCALE_ACTIVE + '/base.yml')
        )
    )
)
for (let variable in envParams) {
    defaultBaseLocale = defaultBaseLocale.replace(new RegExp('{env.' + variable + '}', 'g'), envParams[variable])
}
defaultBaseLocale = JSON.parse(defaultBaseLocale)

module.exports = {
    env: envParamsStr,
    template: assign({ env: envParams }, defaultBaseLocale),
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 5151,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
