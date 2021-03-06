const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   entry: './src/index.js',
   output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public'),
      publicPath: "/",
   },
   devtool: 'source-map',
   module: {
      rules: [
         {
            loader: 'babel-loader',
            test: /\.(js|jsx)$/,
            exclude: /node_modules/
         },
         {
            test: /.(css|scss)$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
         },
      ]
   },
   mode: 'development',
   devServer: {
      port: 3000,
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: "index.html",
         template: path.join(__dirname, "public", "index.html"),
      }),
      new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "[id].css",
      }),
   ]
};