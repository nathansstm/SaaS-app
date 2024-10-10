const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  target: 'web',
  devServer: {
    port: '5000',
    host: '0.0.0.0', // Listen on all interfaces (localhost, network IP, etc.)
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    hot: true,
    liveReload: true,
    allowedHosts: ['localhost', '.freemyip.com'], // Allow requests from localhost and DDNS
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true,
        secure: false, // For non-HTTPS, set to false
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.svg'], // Add .svg to extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Rule for CSS files
        use: ['style-loader', 'css-loader'], // These loaders will handle CSS imports
      },
      {
        test: /\.svg$/, // Rule for SVG files
        use: [
          '@svgr/webpack',
          'url-loader', // Added url-loader
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
};
