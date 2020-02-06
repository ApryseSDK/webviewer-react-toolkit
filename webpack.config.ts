import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const BASE_URL = 'src';
const MINIFIED_PATH = 'dist/umd';
const SASS_PATH = 'dist/sass';
const CSS_PATH = 'dist/css';
const LIBRARY_NAME = 'webviewer-react-toolkit';

const config: webpack.Configuration = {
  mode: 'production',
  entry: [`./${BASE_URL}/index.ts`, `./${BASE_URL}/index.scss`],
  output: {
    path: path.resolve(__dirname),
    filename: `${MINIFIED_PATH}/${LIBRARY_NAME}.min.js`,
  },
  externals: [nodeExternals()],
  plugins: [
    new MiniCssExtractPlugin({ filename: `${CSS_PATH}/style.css` }),
    new CopyPlugin([
      {
        from: `${BASE_URL}/styles/_variables.scss`,
        to: `${SASS_PATH}/_variables.scss`,
      },
      {
        from: `${BASE_URL}/styles/_mixins.scss`,
        to: `${SASS_PATH}/_mixins.scss`,
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
    // Only add file types you want to resolve inline without extension.
    extensions: ['.ts', '.tsx', '.scss', '.json'],
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
          },
          { loader: require.resolve('ts-loader'), options: { transpileOnly: true } },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: require.resolve('css-loader') },
          { loader: require.resolve('postcss-loader') },
          { loader: require.resolve('sass-loader') },
        ],
      },
    ],
  },
};

export default config;
