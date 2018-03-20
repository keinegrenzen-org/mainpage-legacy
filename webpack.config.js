const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './src/AppBundle/Resources/private/es6/app.js',
    admin: './src/AdminBundle/Resources/private/es6/admin.js',
    profile: './src/AppBundle/Resources/private/es6/profile.js'
  },
  output: {
    filename: '[name].min.js?[hash]',
    path: path.resolve('./web/assets/js/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'targets': {
                  'browsers': ['last 2 versions']
                }
              }]
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [
                    path.resolve('./node_modules/bootstrap/scss')
                  ]
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: './postcss.config.js'
                  }
                }
              }
            ]
          }
        )
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '../images/[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: '../css/[name].min.css?[hash]',
      disable: false,
      allChunks: true
    })
  ]
}