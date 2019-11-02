const path = require('path');

module.exports = {
	mode: "production",
	entry: './src/index.js',
	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	watch: true,
	watchOptions: {
		poll: true
	},
};