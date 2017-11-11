var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		'./js/main.js',
		'./css/main.scss',
	],
	output: {
		path: __dirname + "/../dist",
		filename: "main.js",
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel' },
			{ test: /\.html$/, loader: 'html' },
			{ test: /\.(woff2?|svg|ttf|eot)(\?.*)?$/, loader: 'url' },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('css') },
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				// 'NODE_ENV': JSON.stringify('development'),
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
				'API_URL': JSON.stringify('http://localhost:3001/api/'),
				'FILE_URL': JSON.stringify('http://dashboard.whyme.co.kr')
			}
		}),
		new ExtractTextPlugin('[name].css', {
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.html'),
			inject: true,
			hash: true,
			filename: 'cms/index.html',
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'login.html'),
			inject: true,
			hash: true,
			filename: 'cms/login.html',
		}),
	],
	externals: {
		'text-encoding': 'window'
	}
};
