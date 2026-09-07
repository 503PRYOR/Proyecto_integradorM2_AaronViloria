const eslint = require('@eslint/js');

module.exports = [
  eslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        __dirname: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        process: 'readonly'
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn'
    },
    ignores: ['coverage/', 'node_modules/'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  }
];