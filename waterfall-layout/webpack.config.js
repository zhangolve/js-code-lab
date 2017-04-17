const path = require('path');

module.exports = {
  entry: "./index.js",
  // 两个入口地址，webpack之后生成了两个文件，这两个文件在index.html中被引用了。
  output: {

    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'build.js',
  }
};
