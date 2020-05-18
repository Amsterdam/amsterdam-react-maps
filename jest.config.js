module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/test/__mocks__/svgMock.ts',
    '^.+\\.css': '<rootDir>/test/__mocks__/cssMock.ts',
  },
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/es/', '/examples/'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testRegex: ['/__tests__/.*\\.(ts|tsx|js)$', '/*.test\\.(ts|tsx|js)$'],
}
