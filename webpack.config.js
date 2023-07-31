const path = require('path');

module.exports = {
  entry: './src/index.js', // The entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output path for bundled files
    filename: 'bundle.js', // Name of the bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel loader to transpile JavaScript
          options: {
            presets: ['@babel/preset-react'], // Use React preset for JSX files
          },
        },
      },
      // Add other loaders for handling different file types (e.g., CSS, images, etc.) here
    ],
  },
  // Other Webpack configurations like plugins, resolve, etc., can be added here
};
