import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig(({ command }) => {
  return {
    plugins: [
      monkey({
        entry: 'src/main.ts',
        userscript: {
          icon: 'https://vitejs.dev/logo.svg',
          namespace: 'https://github.com/lisonge',
          author: `lisonge`,
          description: {
            '': `network-extension`,
          },
          match:
            command == 'serve'
              ? [`https://i.songe.li/*`]
              : [`http://*/*`, `https://*/*`],
          noframes: true,
          connect: `*`,
        },
      }),
    ],
  };
});
