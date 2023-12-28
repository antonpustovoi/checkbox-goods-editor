const { override, addBabelPlugin, addBabelPreset } = require("customize-cra");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const addTsconfigPathsWebpackPlugin = (config) => {
  config.resolve.plugins.push(
    new TsconfigPathsPlugin({
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    })
  );
  return config;
};

module.exports = override(
  addBabelPlugin(["@emotion"]),
  addBabelPreset([
    "@babel/preset-react",
    { runtime: "automatic", importSource: "@emotion/react" }
  ]),
  addTsconfigPathsWebpackPlugin,
  (config) => {
    config.output.filename =
      process.env.NODE_ENV === "production"
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/[name].js";
    return config;
  }
);
