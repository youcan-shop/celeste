import type { Preview } from '@storybook/vue3-vite';

import 'virtual:uno.css';
import '@youcan/celeste-tokens/tokens.css';

const preview: Preview = {
  parameters: {
    docs: {
      codePanel: true,
    },
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
  globalTypes: {
    direction: {
      name: 'Direction',
      description: 'Text direction',
      defaultValue: 'ltr',
      toolbar: {
        icon: 'paragraph',
        items: [
          { value: 'ltr', title: 'LTR', right: 'Latin' },
          { value: 'rtl', title: 'RTL', right: 'عربي' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      return {
        components: { story },
        setup() {
          const direction = context.globals.direction || 'ltr';

          if (document) {
            document.documentElement.dir = direction;
            document.body.dir = direction;
          }

          return { direction };
        },
        template: `
          <div 
            :dir="direction" 
            :style="{ 
              direction: direction,
              textAlign: direction === 'rtl' ? 'right' : 'left',
              fontFamily: direction === 'rtl' ? 'Cairo, Inter, -apple-system, sans-serif' : 'inherit'
            }"
          >
            <story />
          </div>
        `,
      };
    },
  ],
  tags: ['autodocs'],
};

export default preview;
