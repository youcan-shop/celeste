import type { IconifyChars, IconifyInfo, IconifyJSON, IconifyMetaData } from '@iconify/types';
import rawicons from '../assets/icons.json';
import rawinfo from '../assets/info.json';

const chars: IconifyChars = {};
const metadata: IconifyMetaData = {};

const info = <unknown>rawinfo as IconifyInfo;
const icons = rawicons as IconifyJSON;

export {
  chars,
  icons,
  info,
  metadata,
};

export { IconifyChars, IconifyInfo, IconifyJSON, IconifyMetaData };
