module.exports = {
    plugins: [
      require('postcss-url')({ url: 'rebase', useHash: true }),
      require('autoprefixer')
    ]
  }