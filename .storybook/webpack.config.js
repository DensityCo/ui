const fs = require('fs');
const path = require('path');
const jsonImporter = require('@density/node-sass-json-importer');

module.exports = {
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      // *.scss files are processed through three steps:
      // - style-loader, which includes them in the output bundle and will include a style tag in
      //   the dom when the component's compiled bundle is loaded.
      // - css-loader, which does the css modules transformations - this means each class name in
      //   each file is rewritten so it only targets the elements that are desired.
      // - sass-loader, which does the sass compilation with node-sass. In addition, this uses
      //   node-sass-json importer to permit importing of json files containing variables.
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              /* for example, drp-styles-button-1SZwRzu8 */
              localIdentName: 'drp-[name]-[local]-[hash:base64:8]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
							// Apply the JSON importer via sass-loader's options.
              importer: jsonImporter,
							// Tell node-sass to search in the node modules directory for things to import
							includePaths: [
								path.join(path.resolve(__dirname, '../'), 'node_modules'),
							],
            },
          },
        ],
        include: path.resolve(__dirname, '../'),
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        include: path.resolve(__dirname, '../'),
      },

      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.join(path.resolve(__dirname, '../'), 'tsconfig.json'),
          }
        },
      },

      {
        test: /story\.jsx?$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: { parser: 'javascript' },
          },
        ],
        enforce: 'pre',
      },
      {
        test: /story\.tsx?$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: { parser: 'typescript' },
          },
        ],
        enforce: 'pre',
      },
    ],
  },
};
