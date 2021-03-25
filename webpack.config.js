const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   entry: './src/app.js',
   output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public')
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
      contentBase: path.join(__dirname, 'public')
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