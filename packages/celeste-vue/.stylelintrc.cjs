module.exports = {
  extends: [
    'stylelint-config-property-sort-order-smacss',
    'stylelint-config-standard-vue',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'config',
          'layer',
          'responsive',
          'screen',
          'tailwind',
          'unocss',
          'variants',
        ],
      },
    ],
  },
};
