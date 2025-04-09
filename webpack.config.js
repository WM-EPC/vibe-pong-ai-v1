const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development', // Change to 'production' for production builds
  devtool: 'inline-source-map', // Source mapping for easier debugging
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the output directory before each build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', // Path to your HTML template
      title: 'Vibe Pong AI',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets', noErrorOnMissing: true }, // Copy assets, don't error if missing
      ],
    }),
  ],
  devServer: {
    static: './dist', // Serve content from the dist directory
    hot: true, // Enable Hot Module Replacement
  },
}; 