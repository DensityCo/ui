const fs = require('fs');
const path = require('path');
const jsonImporter = require('@density/node-sass-json-importer');
const camelcase = require('camelcase');

const package = require('./package.json');

// External dict of peer dependencies so they can be loaded in dynamically.
const peerDependencies = {};
for (const key in package.peerDependencies) {
  peerDependencies[key] = {
    root: key,
    commonjs2: key,
    commonjs: key,
    amd: key,
  };
}

module.exports = {
  entry: path.join(path.resolve(__dirname), 'src', 'index.ts'),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: '@density/ui',
    libraryTarget: 'umd',
  },
  externals: [
    peerDependencies,
  ],
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json'
          }
        },
      },

      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // compile jsx => React.createElement
              '@babel/preset-react',
              // use "modern" javascript, whatever that means
              ['@babel/preset-env', {
                // provide polyfills as necessary
                'useBuiltIns': 'entry',
                'targets': '>0.2%, not dead, not ie <= 10, not op_mini all'
              }]
            ],
            plugins: [
              // convert async / await => generators (then generators => regenerator-runtime)
              '@babel/plugin-transform-async-to-generator',
              // support for class properties for class components etc
              '@babel/plugin-proposal-class-properties'
            ],
          },
        },
      },

      //
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
              /* for example, dui-styles-button-1SZwRzu8 */
              localIdentName: 'dui-[name]-[local]-[hash:base64:8]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
							// Apply the JSON importer via sass-loader's options.
              importer: jsonImporter,
							// Tell node-sass to search in the node modules directory for things to import
							includePaths: [
								path.join(path.resolve(__dirname), 'node_modules'),
							],
            },
          },
        ],
        include: path.resolve(__dirname),
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        include: path.resolve(__dirname),
      },
    ],
  },
};
