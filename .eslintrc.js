module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/prettier', 'elint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    indent: ['off', 2],
    semi: [2, 'always'], // 语句强制分号结尾
    quotes: [2, 'double'], // js必须使用单引号
    'vue/no-parsing-error': 'off',
    'no-irregular-whitespace': 'off',
    'no-async-promise-executor': 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': ['error', 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
