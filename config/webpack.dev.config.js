const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = {
	mode: 'development',
	entry: path.join(__dirname, "../example/src/app.js"),
	output: {
		path: path.join(__dirname, "../example/src/"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /\.min\.css$/,
				loader: ['style-loader', 'css-loader?modules'],
			},
			{
				test: /\.min\.css$/,
				loader: ['style-loader', 'css-loader'],
			},
		]
	},
	devServer: {
		contentBase: path.join(__dirname, '../example/src/'),
		compress: true,
		host: '127.0.0.1',
		port: 3001,
		open: true
	},
};
module.exports = merge(devConfig, baseConfig);
