import { copyFileSync } from 'node:fs';
import { defineBuildConfig } from 'obuild/config';

export default defineBuildConfig({
  entries: [
    {
      type: 'bundle',
      input: ['./src/index.ts'],
      outDir: './dist',
      minify: true,
      rolldown: {
        output: { sourcemap: true },
      },
    },
  ],
  hooks: {
    end: () => {
      copyFileSync('./assets/icons.json', './dist/icons.json');
      copyFileSync('./assets/info.json', './dist/info.json');
    },
  },
});
