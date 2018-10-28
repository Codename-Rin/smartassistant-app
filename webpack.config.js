const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env',
							  '@babel/react',{
							  'plugins': ['@babel/plugin-proposal-class-properties']}]
				}
			},
			{
				test: /\.(json)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 20000,
						name: '[name].[ext]',
					},
				},
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
}