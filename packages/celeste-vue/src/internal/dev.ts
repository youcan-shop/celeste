import { createApp } from 'vue';
import Dev from './dev.vue';
import 'virtual:uno.css';

const app = createApp(Dev, {});

app.mount('#app');
