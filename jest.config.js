// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // Use jsdom to simulate a browser-like environment
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Setup testing library with custom matchers
  moduleFileExtensions: ['js', 'jsx'], // Recognize both JS and JSX files
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Transpile JavaScript and JSX files using Babel
  },
};
