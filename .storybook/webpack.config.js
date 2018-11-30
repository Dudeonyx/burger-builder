const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = (_baseConfig, _env, config) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      },
      // require.resolve('react-docgen-typescript-loader'),
    ],
  });
  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      async: false,
      checkSyntacticErrors: true,
      formatter: require('react-dev-utils/typescriptFormatter'),
    }),
    new TSDocgenPlugin()
  );
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
