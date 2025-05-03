'use strict';

const argv = require('minimist')(process.argv.slice(2));
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const generateConstsToFolder = require('./tools/generateConsts').generateConstsToFolder;
const APP_DIR = path.join(__dirname, 'src');
const pathToConsts = argv.regenerateConsts
    ? generateConstsToFolder('./sletat-api-services-consts.json', 'Test', './src/config/api-consts')
    : generateConstsToFolder('./sletat-api-services-consts.json', 'Release', './src/config/api-consts');
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
    mode: argv.regenerateConsts ? 'development' : 'production',
    devtool: 'source-map',
    entry: {
        app: [
            'react',
            'react-dom',
            'react-addons-css-transition-group',
            'localforage',
            'lodash/pick',
            'lodash/clone',
            'lodash/map',
            'lodash/filter',
            'lodash/isEqual',
            'lodash/minBy',
            'lodash/maxBy',
            'lodash/merge',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/GetOffices/GetOfficesResponse',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/GetOffices/GetOffices',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/GetHotelInfo/GetHotelInfoResponse',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/ActualizePriceResponse',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/Resources',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/OilTaxes',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/ActualizePrice/VisaFees',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/SaveTourOrder/SaveTourOrder',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/SaveTourOrder/SaveTourOrderRequest',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/GetTourCardInfo',
            'sletat-api-services/lib/ModuleApiServices/Main.svc/GetActualizationResult/GetActualizationResultAsync',
            'sletat-api-services/lib/types',
            'sletat-api-services/lib/Tour',
            'sletat-api-services/lib/ModuleApiServices/Comments.svc/GetComments/GetComments',
            'sletat-api-services/lib/ModuleApiServices/Comments.svc/GetComments/GetCommentsResponse',
            'sletat-api-services/lib/ModuleApiServices/Comments.svc/AddLargeComment/AddLargeComment',
            'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim/Request',
            'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaimEx',
            'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim',
            'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/GetSettings',
            'sletat-api-services/lib/UISletatApiServices/API/GetHotelOnMapImage/GetHotelOnMapImage',
            'sletat-api-services/lib/URLShortener/URLShortener',
            'sletat-common-utils/lib/format/number',
            'sletat-common-utils/lib/format',
            'sletat-common-utils/lib/BEM/BEMClassNames',
            'sletat-common-utils/lib/emitter',
            'sletat-common-utils/lib/parse/fromString',
            'sletat-common-utils/lib/smoothScroll/scrollToCoordsPolyFill',
            'sletat-ui-components/lib/Hotel/HotelServicesList',
            'sletat-ui-components/lib/Hotel/HotelRating',
            'sletat-ui-components/lib/Hotel/Reviews/HotelReviewsList/SletatHotelReviewsList',
            'sletat-ui-components/lib/Hotel/Reviews/AddHotelReviewForm',
            'sletat-ui-components/lib/MultiLevelMenu/AdaptiveMultiLevelMenu',
            'sletat-ui-components/lib/MultiLevelMenu/MultiLevelMenu',
            'sletat-ui-components/lib/Forms/FormeGenerale',
            'sletat-ui-components/lib/Forms/EmailInput',
            'sletat-ui-components/lib/Forms/NameInput',
            'sletat-ui-components/lib/Forms/PhoneInput',
            'sletat-ui-components/lib/Forms/BuyOnline',
            'sletat-ui-components/lib/PhotoGallery/PhotoGallery',
            'sletat-ui-components/lib/MultiLevelMenu/Tabs',
            'sletat-ui-components/lib/IFrame/IFrame',
            'react-sletat-uikit/lib/ui-text/UiText',
            'react-sletat-uikit/lib/ui-select/UiSelect',
            'react-sletat-uikit/lib/ui-button/UiButton',
            'react-sletat-uikit/lib/ui-pagination/UiPagination',
            'react-sletat-uikit/lib/ui-loader/UiLoader'
        ]
    },
    output: {
        filename: '[name].dll.js',
        library: '[name]_dll',
        path: path.join(__dirname, 'public')
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
        new webpack.DllPlugin({
            path: 'public/[name]-dll.json',
            name: '[name]_dll'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new WebpackNotifierPlugin({ alwaysNotify: true })
    ],
    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ],
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react'),
            'react-dom': path.join(__dirname, 'node_modules', 'react-dom'),
            'sletat-api-services-consts': pathToConsts
        },
        extensions: ['.js', '.tsx', '.ts', '.styl', '.css']
    }
};
