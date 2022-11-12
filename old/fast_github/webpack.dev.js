const ExtensionReloader = require("webpack-extension-reloader");
const dev = require("./webpack.config");
const { merge } = require('webpack-merge');

module.exports = merge(dev, {
  plugins: [
    new ExtensionReloader()
  ],
});