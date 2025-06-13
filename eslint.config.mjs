import antfu from '@antfu/eslint-config'

export default antfu({
  languageOptions: {
    ecmaVersion: 'latest',
    globals: {
      /**
       * 全局变量
       */
      $t: true,
      uni: true,
      UniApp: true,
      wx: true,
      WechatMiniprogram: true,
      getCurrentPages: true,
      UniHelper: true,
      Page: true,
      App: true,
      NodeJS: true,
    },
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    'vue/multi-word-component-names': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'eqeqeq': 'off',
    'node/prefer-global/process': 'off',
  },
})
