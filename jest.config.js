/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // Tells ts-jest to use the ESM runner
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treats TypeScript files as ESM modules
  moduleNameMapper: {
    // Overrides TS explicit .js extensions back to local .ts files
    '^(\\.{1,2}/.*)\\.js$': '$1', 
    '\\.(css|less|scss|sass)$': '<rootDir>/apps/website/__mocks__/fileMock.js',
    '\\.(svg|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/apps/website/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/apps/website/$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Forces ts-jest to output ESM instead of CJS
        // Jest only reads one options object, so tsconfig overrides must live here too
        tsconfig: {
          module: 'ESNext',
          target: 'ES2022', // Needed for top-level await with jest.unstable_mockModule
          esModuleInterop: true,
          jsx: 'react-jsx', // Compile JSX in .tsx tests/components
        },
      },
    ],
  },
  globals: {
    'process.env': {
      NEXT_PUBLIC_SUPABASE_KEY: 'placeholder-anon-key-string',
    },
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "\\.spec\\.ts$"
  ],
};
