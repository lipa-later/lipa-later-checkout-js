const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  //   devServer: {
  //     contentBase: './dist',
  //   },
  plugins: [
    new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify('development'),
                'NODE_ENV': JSON.stringify('development'),
                'BASE_URL': JSON.stringify('http://localhost:3000')
            }
        })
  ]
});
