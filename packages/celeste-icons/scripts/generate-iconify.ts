import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { stdout } from 'node:process';
import {
  cleanupSVG,
  deOptimisePaths,
  importDirectory,
  isEmptyColor,
  parseColors,
  runSVGO,
} from '@iconify/tools';
import { ensureFile } from 'fs-extra';
import pkg from '../package.json' assert {type: 'json'};

// this is a stub
const info = {
  prefix: 'celeste',
  name: 'Celeste Icons',
  total: 3058,
  version: '0.1.3',
  author: 'YouCan <tech@youcan.shop>',
  height: 24,
  category: 'General',
  palette: false,
};

(async () => {
  info.version = pkg.version;
  info.author = pkg.author as any;

  const source = 'icons';
  const prefix = info.prefix;

  const iconSet = await importDirectory(source, {
    prefix,
  });

  await iconSet.forEach(async (name, type) => {
    if (type !== 'icon') {
      return;
    }

    const svg = iconSet.toSVG(name)!;

    await cleanupSVG(svg);
    await parseColors(svg, {
      defaultColor: 'currentColor',
      callback: (attr, colorStr, color) => {
        if (!color) {
          throw new Error(`Invalid color: "${colorStr}" in attribute ${attr}`);
        }

        // ignore brand icon colors
        if (name.startsWith('brand')) {
          return color;
        }

        if (isEmptyColor(color)) {
          return color;
        }

        return 'currentColor';
      },
    });

    await runSVGO(svg, {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
      ],
    });

    await deOptimisePaths(svg);

    iconSet.fromSVG(name, svg);
  });

  const iconSetContent = iconSet.export(true);

  await ensureFile(resolve('assets', 'icons.json'));

  await fs.writeFile(
    resolve('assets', 'icons.json'),
    JSON.stringify(iconSetContent, null, '\t'),
    'utf8',
  );

  const count = Object.keys(iconSet.entries).length;

  stdout.write(`Found ${count} icons`);

  info.total = count;
  info.height = iconSetContent.height || 20;

  await fs.writeFile(
    resolve('assets', 'info.json'),
    JSON.stringify(info, null, 2),
    'utf-8',
  );
})();
