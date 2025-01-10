import youcan from '@youcan/lint';

export default youcan(
  {
    ignores: ['node_modules', 'dist', 'packages/celeste-icons/assets'],
    type: 'lib',
    formatters: true,
    vue: true,
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
