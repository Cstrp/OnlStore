const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const randomPort = () => {
  return Math.floor(Math.random() * 8888) + 1000;
};

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
}

const pages = ['index'];

module.exports = {
  mode,
  context: path.resolve(__dirname, 'src'),
  entry: pages.reduce((config, page) => {
    config[page] = `./${page}.ts`;
    return config;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: pathData => {
      const filePath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filePath}/[name][ext]`
    },
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    allowedHosts: 'auto',
    compress: false,
    open: true,
    hot: false,
    port: randomPort(),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
  },
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./${page}.html`,
          filename: `./${page}.html`,
          chunks: [page],
        })
    ),
    [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new ESLintPlugin({
        extensions: ['.tsx', '.ts', '.js'],
        exclude: 'node_modules',
      }),
    ]
  ),
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.(js)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(ts)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource',
        generator: {
          filename: 'assets/img/[name][hash][ext][query]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name].[ext]',
        },
      },
    ],
  },
};
