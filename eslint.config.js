import youcan from '@youcan/lint';

export default youcan({
  formatters: true,
  vue: true,
  ignores: [
    'pnpm-workspace.yaml',
  ],
});
