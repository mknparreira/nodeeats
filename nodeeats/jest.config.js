module.exports = {
  // Defines the file extensions that can be imported in tests
  moduleFileExtensions: ['ts', 'js', 'json'],

  // Sets the root directory for tests
  rootDir: './',

  // Allows transforming TypeScript files before running tests.
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // Directories where Jest should look for test files
  roots: ['<rootDir>/src', '<rootDir>/tests'],

  // Pattern for test file names (e.g., `user.service.spec.ts`)
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],

  // Directory where the test coverage report will be generated
  coverageDirectory: 'coverage',

  // Specifies which files should be included in the test coverage report
  collectCoverageFrom: [
    'src/**/*.{ts,js}', // Includes `.ts` and `.js` files inside `src`
    '!src/main.ts', // Excludes `main.ts` (usually just initializes the app)
    '!src/**/index.ts', // Excludes `index.ts` files
  ],

  // Sets the environment where tests will run (Node.js)
  testEnvironment: 'node',

  // Path mappings to support TypeScript aliases
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@entites/(.*)$': '<rootDir>/src/entites/$1',
    '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^@mocks/(.*)$': '<rootDir>/tests/mocks/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@handlers/(.*)$': '<rootDir>/src/handlers/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },

  // Configures Jest to automatically clear mocks before each test
  clearMocks: true,

  // Maximum time for a test to run before failing (optional)
  testTimeout: 10000, // 10 seconds
};
