const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('webpack-inline-manifest-plugin');
const MOBILE_WEBSITE = path.resolve(__dirname, 'src/ljmall/website/mobile');
const SOM_COMMON = path.resolve(__dirname, 'src/ljmall/website/store_operator_mobile/frontend/Common');
const APP_SRC_PATH = path.resolve(MOBILE_WEBSITE, 'frontend');
const APP_DIST_PATH = path.resolve(__dirname, 'static/mobile/dist');
const STATIC_PATH = path.resolve(__dirname, 'static');
const jsTemplate = path.resolve(APP_SRC_PATH, 'frontend-js.ejs');
const cssTemplate = path.resolve(APP_SRC_PATH, 'frontend-css.ejs');
const jsTemplateDistFile = path.resolve(APP_SRC_PATH, 'frontend-js.html');
const cssTemplateDistFile = path.resolve(APP_SRC_PATH, 'frontend-css.html');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');
const CosPlugin = require('cos-webpack');


module.exports = function (env) {
    const isDev = env === 'dev';

    const plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: jsTemplate,
            filename: jsTemplateDistFile
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: cssTemplate,
            filename: cssTemplateDistFile
        }),
        new webpack.HashedModuleIdsPlugin(),
        new InlineManifestWebpackPlugin(),
        new CleanWebpackPlugin([APP_DIST_PATH], {
            verbose: true,
            dry: false
        }),
        new webpack.DefinePlugin({
            IS_DEV_ENV: isDev,
            IS_PROD_ENV: env === 'prod'
        }),
        //,new BundleAnalyzerPlugin({analyzerPort: 8899})
    ];
    if (!isDev) {
        plugins.push(new WebpackChunkHash());
    }

    return {
        entry: {
            app: ['@babel/polyfill', 'whatwg-fetch', path.resolve(APP_SRC_PATH, 'app.js')],
            utils: [
                path.resolve(APP_SRC_PATH, 'Common/Utils'),
                path.resolve(SOM_COMMON, 'Common.js')
            ]
        },
        output: {
            path: APP_DIST_PATH,
            publicPath: '/static/mobile/dist/',
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].js',
            sourceMapFilename: '[file].map'
        },
        mode: isDev ? 'development' : 'production',
        resolve: {
            alias: {
                scss: path.resolve(APP_SRC_PATH, 'scss'),
                static: STATIC_PATH,
                SomCommon: SOM_COMMON,
                Common: path.resolve(APP_SRC_PATH, 'Common')
            }
        },
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
                cssProcessorOptions: {zindex: false, autoprefixer: false},
                canPrint: false
                })
            ],
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        name: 'commons'
                    },
                    vendor: { // 将第三方模块提取出来
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10, // 优先
                        enforce: true,
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'raw-loader'
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [ 
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    include: [
                        APP_SRC_PATH,
                        SOM_COMMON,
                        path.resolve(__dirname, 'node_modules/query-string'),
                        path.resolve(__dirname, 'node_modules/strict-uri-encode')
                    ],
                    use: [
                        {
                            loader: 'babel-loader?cacheDirectory=true'
                        }
                    ]
                },
                {
                    test: /\.(png|gif|svg|jpg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10240, // 6K
                                name: '[hash].[ext]',
                                outputPath: 'images/',
                                publicPath: '/static/mobile/dist/images/'
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[hash].[ext]',
                                limit: 10240, //10k
                                outputPath: 'fonts/',
                                publicPath: '/static/mobile/dist/fonts/'
                            }
                        }
                    ]
                }
            ]
        },
        devtool: isDev ? 'eval-source-map' : 'source-map',
        externals: {
            jquery: 'jQuery'
        },
        plugins
    };
};