'use strict';

const argv = require('minimist')(process.argv.slice(2));
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const WebpackNotifierPlugin = require('webpack-notifier');
const precss = require('precss');
const generateConstsToFolder = require('./tools/generateConsts').generateConstsToFolder;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const APP_DIR = path.join(__dirname, 'src');
const ENTRY_POINT = process.env.USERMODE === 'dev'
    ? path.join(APP_DIR, 'index.ts')
    : path.join(APP_DIR, 'entry-point.tsx');
const getCSSLoaderRules = require('./get-css-loader-rules');

const postCSSOpts = {
    ident: 'postcss',
    plugins: [
        precss(),
        autoprefixer({
            browsers: ['last 3 versions', 'Firefox ESR', 'ie >= 11']
        }),
    ]
};

module.exports = (env) => {

    const pathToConsts = env && env.regenerateConsts
        ? generateConstsToFolder('./sletat-api-services-consts.json', 'Test', './src/config/api-consts')
        : generateConstsToFolder('./sletat-api-services-consts.json', 'Release', './src/config/api-consts');

    return {
        mode: 'development',
        watch: process.env.USERMODE !== 'dmtrv' && !(/test[\d+]/.test(process.env.USERMODE)),
        devtool: 'source-map',
        entry: {
            app: ENTRY_POINT
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'public'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    loader: 'source-map-loader'
                },
                {
                    test: /\.tsx?$/,
                    use: ['awesome-typescript-loader'],
                    include: APP_DIR
                },
                {
                    test: /\.styl$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        'css-loader',
                        'stylus-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        'css-loader'
                    ],
                    include: /(node_modules)/
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: postCSSOpts
                        }
                    ],
                    exclude: /(node_modules)/
                },
                {
                    test: /\.module.s[ac]ss$/i,
                    use: [
                        ...getCSSLoaderRules({ postCSSOpts, name: 'TourCard-[folder]__[local]' }),
                        {
                            loader: "sass-loader",
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimeType: 'application/font-woff'
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: ['file-loader']
                }
            ]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new MiniCssExtractPlugin({
                filename: 'main.css'
            }),
            new WebpackNotifierPlugin({ alwaysNotify: true }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            })
        ],
        resolve: {
            modules: [
                path.resolve('./src'),
                'node_modules'
            ],
            alias: {
                'react': path.join(__dirname, 'node_modules', 'react'),
                'react-sletat-uikit': path.join(__dirname, 'node_modules', 'react-sletat-uikit'),
                'react-dom': path.join(__dirname, 'node_modules', 'react-dom'),
                'sletat-api-services-consts': pathToConsts
            },
            extensions: ['.js', '.tsx', '.ts', '.styl', '.css']
        }
    };
};
