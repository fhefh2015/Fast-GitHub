const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtensionReloader = require("webpack-extension-reloader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // content: [
    // ],
    content: path.resolve(__dirname, "src/content/content.js"),
    options: path.resolve(__dirname, "src/options/options.js"),
    background: path.resolve(__dirname, "src/background/background.js"),
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              ["@babel/preset-env", { useBuiltIns: "entry", corejs: 3 }],
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        // 处理图片资源,无法处理html中<img src='1.png'>图片
        // 需要url-loader和file-loader,url-loader依赖file-loader
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        // 只有一个loader
        loader: 'url-loader',
        // loader配置
        options: {
          // 小于8kb，转换base64
          limit: 6 * 1024,
          name: 'static/images/[name].[hash:7].[ext]',
          /**
           * 现象:
           * <img src='[object object]'>
           * 原因:
           * url-loader默认使用es6模块解析，而html-loader引入图片是使用commonjs解析
           * 解决:
           * 关闭url-loader的es6解析，开启commonjs解析
           */
          esModule: false,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: "html-loader" },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      template: './src/options/options.html',
      filename: 'options.html',
      favicon: './src/assets/icons/icon38.png',
      inject: 'body',
      chunks: ['options'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/manifest.json"),
          to: "manifest.json",
        },
        {
          from: path.resolve(__dirname, "src/assets/icons"),
          to: "icons",
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: "source-map",
};
