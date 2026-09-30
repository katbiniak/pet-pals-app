const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Ensure Metro resolves react from the project root
config.resolver.nodeModulesPath = [
  path.resolve(projectRoot, 'node_modules'),
];

module.exports = config;