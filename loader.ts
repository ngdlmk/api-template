const tsConfigPaths = require("tsconfig-paths");
const tsConfig = require("./tsconfig.json");

// Register paths
tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,
});

// Start your application
require("./src/app"); // Adjust this path to your entry file
