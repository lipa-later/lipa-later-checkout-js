const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify('production'),
                'NODE_ENV': JSON.stringify('production'),
                'BASE_URL': JSON.stringify('https://checkout.lipalater.com')
            }
        })
  ]
});
