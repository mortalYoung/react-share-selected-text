module.exports = {
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: /node_modules/
			}
		]
	},
};
