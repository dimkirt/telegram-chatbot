module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'quotes': [2, 'single'],
    'indent': [2, 2],
    'max-len': [2, 120],
    // We disable this to make life with Mongo easier
    'no-underscore-dangle': 0,
    'require-await': 1,
    'prefer-promise-reject-errors': 1,
    'no-magic-numbers': 1
  },
};
  