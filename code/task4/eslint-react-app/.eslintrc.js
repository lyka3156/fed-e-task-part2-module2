module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended', // 这个和下面的两个注释的操作一样的结果
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  // plugins: [
  //   'react',
  // ],
  // rules: {
  //   "react/jsx-uses-react": 2,    // 没有使用react的不报错
  //   "react/jsx-uses-vars": 2    // 没有使用的var的不报错
  // },
};
