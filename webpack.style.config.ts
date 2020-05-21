import { BASE_URL } from './webpack.config';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: webpack.Configuration = {
  mode: 'production',
  watch: true,
  entry: [`./${BASE_URL}/index.scss`],
  plugins: [new MiniCssExtractPlugin({ filename: `css/style.css` })],
  resolve: {
    extensions: ['.scss'],
  },
  module: {
    rules: [
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
