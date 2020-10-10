const path = require('path');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "production",
    // optimization: {
    //     runtimeChunk: {
    //         name: 'manifest'
    //     },
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             cache: true, parallel: true, sourceMap: true // set to true if you want JS source maps
    //         })
    //     ],
    //     splitChunks: {
    //         chunks: 'async',
    //         minSize: 30000,
    //         minChunks: 5,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         name: false,
    //         cacheGroups: {
    //             vendor: {
    //                 name: 'vendor',
    //                 chunks: 'initial',
    //                 minChunks: 2,
    //                 priority: 10,
    //                 reuseExistingChunk: true,
    //                 test: /node_modules\/(.*)\.js/
    //             }
    //         }
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    }
};