module.exports = {
  bail: false,
  moduleFileExtensions: ['js', 'svelte'],
  moduleNameMapper: {
    '^@([A-Z].*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js"
  ],
  testMatch: ['**/*.(test|spec).js'],
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
    '^.+\\.svelte$': 'jest-transform-svelte'
  }
};
