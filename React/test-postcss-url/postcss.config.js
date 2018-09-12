var path = require('path');

module.exports = {
  loader: 'postcss-loader',  
  plugins: {
      'postcss-preset-env': {
        stage: 0 ,
        browsers: 'android>=4.2
        ios>=6
        ie <= 11'
      }
    }
}