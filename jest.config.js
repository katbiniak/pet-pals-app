/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // Tells ts-jest to use the ESM runner
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treats TypeScript files as ESM modules
  moduleNameMapper: {
    // Overrides TS explicit .js extensions back to local .ts files
    '^(\\.{1,2}/.*)\\.js$': '$1', 
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
        },
      },
    ],
  },
  globals: {
    'process.env': {
      NEXT_PUBLIC_SUPABASE_KEY: 'placeholder-anon-key-string',
    },
  },
};
