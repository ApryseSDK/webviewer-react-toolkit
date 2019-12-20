module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // collectCoverage: true,
  // coverageDirectory: './coverage/',

  testMatch: [
    // Match any typescript file ending with ComponentName.test.(ts|tsx).
    '**/?(*.)test.(ts|tsx)',
  ],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },

  moduleNameMapper: {
    '^.+\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },

  // Setup Enzyme
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/.enzyme.js'],
};
