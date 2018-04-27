var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    request = require('request'),
    _ = require('lodash');

var app = module.exports = express();
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.route('/api/pokemons')
  .get((req, res) => {
    request({
      method: 'GET',
      uri: 'http://pokeapi.co/api/v2/pokemon',
    }, function (error, response, body) {
      if (response.statusCode == 200) {
        res.json(body)
      } else {
        console.log(error)
      }
    })
  })

app.route('/api/type')
  .get((req, res) => {
    request({
      method: 'GET',
      uri: 'http://pokeapi.co/api/v2/type'
    }, function (error, response, body) {
      if (response.statusCode === 200) {
        res.json(body)
      } else {
        console.log(error)
      }
    })
})

app.route('/api/type/:name')
  .get((req, res) => {
    request({
      method: 'GET',
      uri: 'http://pokeapi.co/api/v2/type/' + req.params.name
    }, function (error, response, body) {
      if (response.statusCode === 200) {
        res.json(body)
      } else {
        console.log(error)
      }
    })
})

app.route('/api/egg-group')
  .get((req, res) => {
      request({
        method: 'GET',
        uri: 'http://pokeapi.co/api/v2/egg-group',
      }, function (error, response, body) {
        if(response.statusCode == 200){
          res.json(body);
        } else {
          console.log('error');
        }
      })
  })

app.route('/api/egg-group/:name')
  .get((req, res) => {
    request({
      method: 'GET',
      uri: 'http://pokeapi.co/api/v2/egg-group/' + req.params.name,
    }, function (error, response, body) {
      if (response.statusCode === 200) {
        res.json(body)
      } else {
        console.log(error)
      }
    })
  })
  
app.route('/api/pokemon/:name')
  .get((req, res) => {
    request({
      method: 'GET',
      uri: 'http://pokeapi.co/api/v2/pokemon/' + req.params.name,
    }, function (error, response, body) {
      if (response && response.statusCode === 200) {
        res.json(body)
      } else {
        console.log(error);
      }
    })
  })

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/public'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

// Starting express server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});