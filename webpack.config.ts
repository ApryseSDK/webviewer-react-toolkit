import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const BASE_URL = 'src';
const MINIFIED_PATH = 'dist';
const LIBRARY_PATH = 'lib';
const LIBRARY_NAME = 'component_library';

const config: webpack.Configuration = {
  mode: 'production',
  target: 'node',
  entry: [`./${BASE_URL}/index.ts`, `./${BASE_URL}/index.scss`],
  output: {
    path: path.resolve(__dirname),
    filename: `${MINIFIED_PATH}/${LIBRARY_NAME}.bundle.js`,
  },
  devtool: 'source-map',
  externals: [nodeExternals()],
  // externals: [
  // /node_modules/,
  // 'react',
  // 'react-dom',
  // ],
  plugins: [
    new MiniCssExtractPlugin({ filename: `${LIBRARY_PATH}/style.css` }),
    new CopyPlugin([
      {
        from: `${BASE_URL}/styles/_variables.scss`,
        to: `${LIBRARY_PATH}/variables.scss`,
      },
      {
        from: `${BASE_URL}/styles/_mixins.scss`,
        to: `${LIBRARY_PATH}/mixins.scss`,
      },
    ]),
  ],
  optimization: {
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { comparisons: false, inline: 2 },
          mangle: { safari10: true },
          output: { ascii_only: true },
          toplevel: true,
        },
        parallel: true,
        cache: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        baseUrl: BASE_URL,
      }),
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
          },
          { loader: 'ts-loader', options: { transpileOnly: true } },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};

export default config;
