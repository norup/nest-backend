module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@(.*)$': '<rootDir>/$1',
  },
  coverageDirectory: '../coverage',
  testPathIgnorePatterns: ['<rootDir>/dist/'],
};
