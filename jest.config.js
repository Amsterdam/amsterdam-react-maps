module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/arm-core/src/**/*.{js,jsx,ts,tsx}',
    '!packages/**/src/(styles|internals)/**/*.{js,jsx,ts,tsx}',
    '!packages/**/*.(test|stories).{js,jsx,ts,tsx}',
    '!packages/**/(index).{js,jsx,ts,tsx}',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov'],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/test/__mocks__/svgMock.ts',
    '^.+\\.css': '<rootDir>/test/__mocks__/cssMock.ts',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|sv|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/imageMock.ts',
    'arm-core/es/(.*)': '<rootDir>/packages/arm-core/lib/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/config/testing/test-bundler.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/es/', '/lib/', '/stories/'],
  testEnvironment: 'jsdom',
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testRegex: ['/__tests__/.*\\.(ts|tsx|js)$', '/*.test\\.(ts|tsx|js)$'],
}
