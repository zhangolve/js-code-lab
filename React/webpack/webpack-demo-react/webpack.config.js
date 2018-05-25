const path = require('path');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "production",
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [
        // new UglifyJsPlugin({
        //     cache: true,
        //     parallel: true,
        //     sourceMap: true, // set to true if you want JS source maps,
        //     uglifyOptions: {
        //     output: {
        //             comments: true
        //      }
        //     }
        // })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
 devtool: "source-map",
};