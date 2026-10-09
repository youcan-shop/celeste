import { writeFile } from 'node:fs/promises';
import process from 'node:process';

const [output] = process.argv.slice(2);

async function catalog() {
  const response = await fetch('https://fonts.google.com/metadata/fonts');

  if (!response.ok) {
    throw new Error(`google fonts metadata: ${response.status}`);
  }

  const text = await response.text();
  const { familyMetadataList } = JSON.parse(text.slice(text.indexOf('{')));

  return familyMetadataList
    .map(font => ({
      family: font.family,
      category: font.category.toLowerCase().replace(/\s+/g, '-'),
      variants: Object.keys(font.fonts).sort(),
      subsets: font.subsets.filter(subset => subset !== 'menu'),
      popularity: font.popularity,
    }))
    .sort((a, b) => a.popularity - b.popularity);
}

async function current() {
  const response = await fetch('https://fonts.youcan.shop/google-fonts.json');

  if (!response.ok) {
    throw new Error(`current catalog: ${response.status}`);
  }

  return (await response.json()).families;
}

const families = await catalog().catch(async (error) => {
  console.warn(error.message, '- keeping the deployed catalog');

  return current();
});

await writeFile(output, JSON.stringify({ families }));
console.log(`${families.length} families`);
