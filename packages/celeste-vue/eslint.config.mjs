import youcan from '@youcan/lint';

// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

export default youcan(
  {
    type: 'lib',
    formatters: true,
    vue: true,
    unocss: true,
    stylistic: {
      semi: true,
    },
  },
  {
    files: ['*.story.vue'],
    rules: {
      'no-console': 'off',
      'no-alert': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
);
