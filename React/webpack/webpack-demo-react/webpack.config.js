const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');

module.exports = function (env) {
    const isDev = env === 'dev';
    const plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ];
    return {
        entry: './index.css',
        output: {
            filename: 'bundle.js',
            sourceMapFilename: '[file].map'
        },
        mode:'production',
        optimization: {
            runtimeChunk: {
              name: 'manifest'
            },
            minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { autoprefixer: false},
                canPrint: false
                })
            ],
            splitChunks:{
              chunks: 'all',
              minSize: 30000,
              minChunks: 1,
              maxAsyncRequests: 5,
              maxInitialRequests: 3,
              name: false
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [ {loader: MiniCssExtractPlugin.loader
                    },{
                            loader: 'css-loader',
                            options: {
                                 root: 'static',
                                 minimize: true
                            }
                    }]
                },
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
        plugins: plugins
    };
};
