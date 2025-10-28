import type { Preview } from '@storybook/vue3-vite';

import 'virtual:uno.css';
import '@youcan/celeste-tokens/tokens.css';

const globalStyles = `
.sonner-story-container {
  font: var(--paragraph-sm);
  padding: 1rem;
}

.story-heading {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.story-description {
  font: var(--paragraph-sm);
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

const preview: Preview = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        format: true,
        type: 'dynamic',
        excludeDecorators: true,
      },
      canvas: {
        sourceState: 'shown',
      },
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        white: { name: 'white', value: '#ffffff' },
        gray: { name: 'gray', value: '#E1E4EA' },
        dark: { name: 'dark', value: '#333333' },
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
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
