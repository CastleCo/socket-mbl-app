module.exports = {
  preset: "jest-expo",
    transformIgnorePatterns: [
      "/node_modules/(?!native-base)/"
    ],
    setupTestFrameworkScriptFile: "./test-configuration.js",
    modulePathIgnorePatterns: [
      "node_modules/react-native-mock/"
    ]
};