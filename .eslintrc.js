module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-debugger': 'off',
    'no-console': 0,
    'class-methods-use-this': 'off',
    'no-constant-condition': 0,
    'prefer-const': [
      0,
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
  settings: {
    include: [],
  },
  ignorePatterns: ['node_modules/**/*', 'webpack.config.js.', 'babel.config.js', '**/*.config.js'],
};
