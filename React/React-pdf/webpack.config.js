const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
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
const CopyWebpackPlugin = require('copy-webpack-plugin') ;

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
        new CopyWebpackPlugin(
            [
                {
                  from: 'node_modules/pdfjs-dist/cmaps/',
                  to: 'cmaps/'
                }
            ]
        )
        //,new BundleAnalyzerPlugin({analyzerPort: 8899})
    ];
    if (!isDev) {
        plugins.push(new WebpackChunkHash());
    }

    return {
        entry: {
            app: ['babel-polyfill', 'whatwg-fetch', path.resolve(APP_SRC_PATH, 'app.js')],
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
                cssProcessorOptions: { autoprefixer: false , safe: true},
                canPrint: false
                })
            ],
            splitChunks:{
              chunks: 'async',
              minSize: 30000,
              minChunks: 1,
              maxAsyncRequests: 5,
              maxInitialRequests: 3,
              name: false,
              cacheGroups: {
                vendor: {
                  name: 'vendor',
                  chunks: 'initial',
                  minChunks: 3,
                  priority: 10,
                  reuseExistingChunk: true,
                  test: /node_modules\/(.*)\.js/
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
                    use:[
                        {
                            loader: MiniCssExtractPlugin.loader
                        },{
                            loader: 'css-loader',
                             options: {
                                 root: 'static',
                                 minimize: true
                             }
                        },{
                            loader: 'sass-loader'
                        }]
                },
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
                    include: [
                        APP_SRC_PATH,
                        SOM_COMMON,
                        path.resolve(__dirname, 'node_modules/query-string'),
                        path.resolve(__dirname, 'node_modules/strict-uri-encode')
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
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[hash].[ext]',
                                limit: 3072,
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
        plugins: plugins
    };
};
