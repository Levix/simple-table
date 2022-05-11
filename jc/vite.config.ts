import { defineConfig } from "vite";
import { createVuePlugin } from 'vite-plugin-vue2';
import ScriptSetup from 'unplugin-vue2-script-setup/vite'


export default defineConfig({
  plugins: [
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        compositionAPI: true,
        injectH: true,
      },
    }),
    ScriptSetup(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  define: {
    'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`,
      localMode: false,
    },
  }
});
