const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: {
    	'base':['vue'],
    	'index':['./src/page/index/index.js']
    }, 
    output:{
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name]/index.js',
        publicPath: '/'
    },
    devtool: process.env.NODE_ENV=='production'?'hidden-source-map':'cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'vue$': path.resolve(__dirname, '../node_modules/vue/dist/vue.js'),
        }
    },
    module: {
    	rules: [
    	{
		  test: /\.js$/,
		  loader: 'babel-loader',
		  query: {
		    'presets': ['es2015', 'stage-0']
		  },
		  exclude: /node_modules/,
		},
    	{
            test: /\.vue?$/,
            exclude: /node_modules/,
            use: ['vue-loader']
        },
        {
            test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: './imgs/[name].[hash:8].[ext]'
                }
            }]
        },
        {
         test: /\.css$/,
         use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        },
        {
         test: /\.less$/,
         exclude: /node_modules/,
         use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: true
                    }
                }, 'less-loader']
            })
        },
        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader'
        }]
    },
    plugins: [
    	new webpack.optimize.CommonsChunkPlugin({
            names: ['base']
        }),
        new VueLoaderPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('./[name]/index.css'),
        new webpack.ProvidePlugin({
            Vue: 'vue',
            $: 'jquery'
        })
    ]
};