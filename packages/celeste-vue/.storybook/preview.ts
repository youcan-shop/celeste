import type { Preview } from '@storybook/vue3-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { create } from 'storybook/theming';

import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import '@youcan/celeste-tokens/tokens.css';

const celesteDocsTheme = create({
  base: 'dark',
  brandTitle: 'Celeste',
  colorPrimary: '#e1116f', // brand.500
  colorSecondary: '#e1116f',
  appBg: '#171717', // bg.white-0 (dark)
  appContentBg: '#171717',
  appPreviewBg: '#171717',
  appBorderColor: '#333333', // stroke.soft-200 (dark)
  appBorderRadius: 8,
  textColor: '#ffffff', // text.strong-950 (dark)
  textInverseColor: '#171717',
  barBg: '#1c1c1c', // bg.weak-50 (dark)
  barTextColor: '#a3a3a3', // text.sub-600 (dark)
  barSelectedColor: '#e1116f',
  inputBg: '#171717',
  inputBorder: '#333333',
  inputTextColor: '#ffffff',
  inputBorderRadius: 8,
});

const globalStyles = `
body {
  background: var(--color-bg-white-0);
  color: var(--color-text-strong-950);
}

/* The docs chrome is handled by the dark docs theme above; only the component
   preview surface follows the toggle, so a light-mode preview sits on a light
   surface even while the surrounding docs UI stays dark. */
.docs-story {
  background: var(--color-bg-white-0) !important;
}

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
      codePanel: true,
      theme: celesteDocsTheme,
    },
    controls: {
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
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
        system: 'system',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
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
