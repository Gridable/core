const { resolve } = require('path');

module.exports = {
  root: true,

  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],

  plugins: ['import', 'simple-import-sort', 'no-relative-import-paths', '@typescript-eslint'],

  rules: {
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: true, rootDir: 'src', prefix: '@' },
    ],
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.json', '.js', '.ts'],
      },
    },
  },

  parserOptions: {
    project: './tsconfig.esm.json',
    tsconfigRootDir: resolve(__dirname, 'configs'),
  },
};
