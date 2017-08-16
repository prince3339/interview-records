var webpack = require('webpack'); // It's the main module loader
var path = require('path'); //module used to get and resolved directory path
//var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var CleanWebpackPlugin = require('clean-webpack-plugin'); // Used to clean dist folder
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //Used it to extract css code

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'start' || ENV === 'test-prod';
var isProd = ENV === 'build' || ENV === 'prod';

module.exports = {
    context: __dirname + '/src',
    entry: {
        //required-files.js app's javascript is entry point, /src/public/style/sass/main.scss is the scss entry point
        app: ['./required-files.js', __dirname + '/src/public/style/sass/main.scss'],
        vendor: [
            __dirname + '/node_modules/angular',
            __dirname + '/node_modules/angular-messages',
            // __dirname + '/node_modules/angular-route',
            __dirname + '/node_modules/@uirouter/angularjs',
            __dirname + '/node_modules/angularjs-datetime-picker'
        ]
    },
    devtool: 'inline-source-map',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'src'), //Combined js and css file paths are set to src
        //path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     title: 'Interview records'
        // }),
        new ExtractTextPlugin({ // define where to save the file
            filename: '/public/style/css/[name].bundle.css', // combined css file name
            allChunks: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
        //All the vendor library code's will be stored in this file
    ],
    // devServer: {
    //     contentBase: './src'
    // },
    module: {
        rules: [
        {
            test: /\.(css)$/,
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'resolve-url-loader']
                }) ////This loader used to load and extract scss/css files
        },
        {
            test: /\.(scss|sass)$/,
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                }) ////This loader used to load and extract scss/css files
        },
        {
            test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader : 'url-loader'
        }
        ]
    }
};