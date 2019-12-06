const path = require('path');

module.exports = ({config: defaultConfig}) => {
  // Sass loader:
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    include: [path.resolve(__dirname, '../src'), path.resolve(__dirname)],
  });
  defaultConfig.resolve.extensions.push('.scss');

  // TypeScript loader:
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {loader: require.resolve('ts-loader')},
      {loader: require.resolve('react-docgen-typescript-loader')},
    ],
  });
  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  return defaultConfig;
};
