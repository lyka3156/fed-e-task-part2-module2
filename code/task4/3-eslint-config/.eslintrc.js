module.exports = {
  'env': {
    'browser': true,  // 浏览器环境
    'es2020': true,
  },
  // 可以继承多个共享配置
  'extends': [
    'google',
  ],
  // 最高可以使用es11版本,只影响语法检测，不影响语法使用
  'parserOptions': {
    'ecmaVersion': 11,
  },
  // 校验规则的开启
  'rules': {
  },
  // 可以使用的全局成员
  globals: {
  }
};
