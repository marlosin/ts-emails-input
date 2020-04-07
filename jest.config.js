module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(sass)$': '<rootDir>/spec/module-mock.ts'
  },
  modulePaths: [
    '<rootDir>/src',
  ],
  testRegex: '(.spec).ts?$',
  transform: {
    '^.+\\.html?$': 'html-loader-jest',
  },
};
