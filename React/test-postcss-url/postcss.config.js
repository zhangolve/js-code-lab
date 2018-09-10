var path = require('path');

module.exports = {
  loader: 'postcss-loader',  
  plugins: {
      'postcss-url': {
        url: "copy",
        basePath: path.resolve(__dirname, 'static'),
        assetsPath: path.resolve(__dirname, 'static'),
        from: 'style/more/index.css',
        to: 'static/index.css'
      },
      'cssnano': {},
      'autoprefixer': {},
      'postcss-preset-env': {}
    }
}