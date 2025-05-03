const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getCSSLoaderRules({
    postCSSOpts,
    name,
}) {
  const cssLoader = {
      loader: 'css-loader',
      options: {
          modules: true,
          localIdentName: name,
      }
  };

  return [
      {
          loader: MiniCssExtractPlugin.loader,
      },
      cssLoader,
      {
          loader: 'postcss-loader',
          options: postCSSOpts
      }
  ];
}

module.exports = getCSSLoaderRules;
