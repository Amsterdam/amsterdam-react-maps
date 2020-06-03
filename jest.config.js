module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/test/__mocks__/svgMock.ts',
    '^.+\\.css': '<rootDir>/test/__mocks__/cssMock.ts',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|sv|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/imageMock.ts',
    'arm-core/es/(.*)': '<rootDir>/packages/arm-core/lib/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/es/', '/lib/', '/examples/'],
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
