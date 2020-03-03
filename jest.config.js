// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  coverageThreshold: {
    global: {
      branches: 99,
      functions: 98,
      lines: 98,
      statements: 99,
    },
  },
};
