const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    'background': './src/background/index.js',
    'popup': './src/popup/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: process.env.NODE_ENV === 'production' ? '#source-map' : '#cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.less'],
    symlinks: false
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        // exclude: [path.resolve(__dirname, 'src/popup/components/tinymce/static')],
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
            },
            minify: true
          })
        }]
      },
      {
        test: /\.less$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(svg)(\?.*)?$/,
        exclude: [path.join( __dirname, 'node_modules', '@ckeditor' )],
        loader: 'url-loader'
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /ckeditor5-[^\/\\]+[\/\\].+\.css$/,
        loader: 'postcss-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    ...(process.env.NODE_ENV === 'production' ? [] : [new FriendlyErrorsPlugin()]),
    new CKEditorWebpackPlugin({
      language: 'en'
    }),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV !== 'production' ? '[name].css' : '[name].[hash].css',
      chunkFilename: process.env.NODE_ENV !== 'production' ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/popup/index.html'),
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/icons'),
      to: 'icons',
      ignore: ['.*']
    }, {
      from: path.resolve(__dirname, 'src/manifest.json'),
      to: 'manifest.json'
    }, {
      from: path.resolve(__dirname, 'node_modules/tinymce/skins'),
      to: 'skins'
    }]),
    new webpack.DefinePlugin({
      'process.env.RELEASE_CHANNEL': JSON.stringify(process.env.RELEASE_CHANNEL || 'stable')
    })
  ],
  devServer: {
    port: process.env.PORT
  },
  stats: {
    colors: true,
    children: false
  }
}

if (process.env.NODE_ENV === 'production') {
  const TerserPlugin  = require('terser-webpack-plugin')
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  )
  config.optimization = {
    minimizer: [
      new TerserPlugin ({
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          }
        },
        sourceMap: false,
        cache: true,
        parallel: true
      })
    ]
  }
}

module.exports = config;