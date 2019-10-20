const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const { scss } = require('svelte-preprocess');


const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const isInline = process.env.inline;

module.exports = (env, argv) => {
    const devServer = {
      port: 3000,
    };

    const rules = [
      {
        test: /\.(js|mjs|svelte)$/,
        exclude: /node_modules\/(?!svelte)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        },
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            // Enable dev mode for the svelte compiler, so we can
            // use the svelte dev tools extension in the browser.
            dev: env !== undefined && env.svelteDevMode ? true : false,
            emitCss: true,
            hotReload: true,
            preprocess: require('svelte-preprocess')([scss()])
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           **/
          prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|mp4|svg|ttf)$/,
        use: [
          {
            loader: 'file-loader'
          },
        ],
      },
    ];

    const plugins = [
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      new HtmlWebpackPlugin({
        inlineSource: isInline ? '.(js|css)$' : '',
        hash: isInline ? false : true,
        template: './src/index.html',
        title: 'svelte-boilerplate'
      }),
      new HtmlWebpackInlineSourcePlugin()
    ];

    const config = {
      devServer,
      devtool: prod ? false : 'source-map',
      entry: {
        bundle: ['./src/main.js']
      },
      mode,
      module: {
        rules
      },
      output: {
        chunkFilename: '[name].[id].js',
        filename: '[name].js',
        path: __dirname + '/public',
      },
      performance: {
        hints: false,
        maxEntrypointSize: 250000,
      },
      plugins,
      resolve: {
        alias: {
          svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
      },
      target: "web",
    };

    return config;
}
