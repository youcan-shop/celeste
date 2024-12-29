import { createApp } from 'vue';
import Dev from './dev.vue';
import 'virtual:uno.css';
import '@youcan/celeste-tokens/tokens.css';

const app = createApp(Dev, {});

app.mount('#app');
