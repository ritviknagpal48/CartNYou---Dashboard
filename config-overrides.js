// const { alias, aliasJest, configPaths } = require("react-app-rewire-alias");
// const aliasMap = configPaths("./jsconfig.paths.json");
// module.exports = alias(aliasMap);
// module.exports.jest = aliasJest(aliasMap);
// module.exports = function (config, _) {
//   return {
//     ...config,
//   };
// };

const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "@components": path.resolve(__dirname, "src/Components"),
      "@wholeseller": path.resolve(__dirname, "src/Pages/Wholeseller"),
      "@retailer": path.resolve(__dirname, "src/Pages/Retailer"),
    },
  };

  return config;
};
