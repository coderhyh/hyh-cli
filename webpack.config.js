const path = require("path");

const sharedConfig = {
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "bin")],
  },
  devtool: false,
};

module.exports = [
  {
    entry: path.resolve(__dirname, `bin/index.js`),
    output: {
      library: "cli",
      libraryTarget: "umd",
      filename: `cli.js`,
      path: path.resolve(__dirname, `build`),
    },
    ...sharedConfig,
  },
  // {
  //   entry: path.resolve(__dirname, `build/src/viewer/assets.js`),
  //   output: {
  //     path: path.resolve(__dirname, `build/bin/viewer`),
  //   },
  //   ...sharedConfig,
  // },
];
