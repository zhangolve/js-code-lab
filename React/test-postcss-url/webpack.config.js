var path = require('path');
var STATIC_PATH = path.resolve(__dirname, 'static');

module.exports = function () {
    return {
        entry: {
            app: './app.js'
        },
        output: {
            path: STATIC_PATH,
            publicPath: STATIC_PATH,
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].js',
            sourceMapFilename: '[file].map'
        },
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    include: [
                        './app.js',
                    ],
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.(png|gif|svg|jpg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 3072, // 3K
                                name: '[hash].[ext]',
                                outputPath: 'images/',
                                publicPath: '/static/mobile/dist/images/'
                            }
                        }
                    ]
                }
            ]
        }
    };
};
