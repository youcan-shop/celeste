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
  },
  tags: ['autodocs'],
};

export default preview;
