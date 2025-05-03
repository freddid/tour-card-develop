'use strict';

const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const generateConstsToFolder = require('./tools/generateConsts').generateConstsToFolder;
const getCSSLoaderRules = require('./get-css-loader-rules');


const postCSSOpts = {
    ident: 'postcss',
    plugins: [
        precss(),
        autoprefixer({
            browsers: ['last 3 versions', 'Firefox ESR', 'ie >= 11']
        }),
        cssnano()
    ]
};


module.exports = {
    mode: 'production',
    context: __dirname,
    entry: './src/entry-point.tsx',
    output: {
        path: path.resolve(__dirname, './public/'),
        filename: 'app.js'
    },
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.styl', '.css'],
        alias: {
            'react': path.resolve(__dirname, './node_modules/react/'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom/'),
            'react-sletat-uikit': path.resolve(__dirname, './node_modules/react-sletat-uikit/'),
            'sletat-api-services-consts': generateConstsToFolder('./sletat-api-services-consts.json', 'Release', './src/config/api-consts')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        compilerOptions: {
                            'noEmit': false
                        }
                    }
                }]
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
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
