const path = require('path');

module.exports = ({ config: defaultConfig }) => {
  // Only add file types you want to resolve inline without extension.
  defaultConfig.resolve.extensions.push('.ts', '.tsx', '.scss');

  // Sass loader:
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    use: [
      { loader: require.resolve('style-loader') },
      { loader: require.resolve('css-loader') },
      { loader: require.resolve('postcss-loader') },
      { loader: require.resolve('sass-loader') },
    ],
    include: [path.resolve(__dirname, '../')],
  });

  // TypeScript loader:
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      { loader: require.resolve('ts-loader') },
      { loader: require.resolve('react-docgen-typescript-loader') },
    ],
    include: [path.resolve(__dirname, '../')],
  });

  return defaultConfig;
};
