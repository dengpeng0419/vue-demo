require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var mock = require('./mock')
var os = require('os')
var NetworkInterfaces = os.networkInterfaces()

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
var app = express()
var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// mock request
app.use(function(req, res, next) {
  console.log('url->', req.url)
  var data = mock(req.url)
  if (data) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Max-Age', 3600 * 24)
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-Cache')
    res.end(JSON.stringify(data, null, 4))
    return
  }
  next()
});

// var uri = 'http://localhost:' + port
var getIp = () => {
  var ip = 'localhost';
  var count = 0;
  Object.keys(NetworkInterfaces).forEach(name => {
    if (count > 0) return;
    NetworkInterfaces[name].forEach(item => {
      if (item.family !== 'IPv4' || item.internal !== false) return;
        ip = item.address;
        count++;
        return;
      });
    });
    return ip;
};
var uri = 'http://'+ getIp() +':' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
