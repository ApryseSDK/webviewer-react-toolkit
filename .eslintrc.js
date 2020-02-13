module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.lint.json' },
  plugins: ['react-hooks'],
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',

    // Prettier overrides
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  settings: {
    react: { version: '16.8' },
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  rules: {
    // Turn on or modify rules.
    'prefer-const': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/unbound-method': 'error',

    // Turn off rules.
    'react/prop-types': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-triple-slash-reference': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
