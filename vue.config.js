const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugins({
        template: path.resolve(__dirname, 'demo/index.html')
      })
    ]
  }
};