module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  plugins: [],
  globals: {},
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      },
    },
  },
  rules: {
    'no-console': ['off'],
    'space-before-function-paren': ['off'],
    'import/extensions': ['error', 'always', {
      'js': 'never',
    }],
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js'],
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
