const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lipa-later-checkout.js',
    library: {
      name: 'lipalater',
      type: 'umd',
    },
  },
};
