import type { Preview } from '@storybook/vue3';

import 'virtual:uno.css';
import '@youcan/celeste-tokens/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'gray', value: '#E1E4EA' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default preview;
