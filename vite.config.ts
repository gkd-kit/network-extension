import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import pkg from './package.json';

const name = pkg.name.split('/').at(-1)!;

export default defineConfig(({ command }) => {
  return {
    plugins: [
      monkey({
        entry: 'src/main.ts',
        userscript: {
          icon: 'https://vitejs.dev/logo.svg',
          namespace: 'https://github.com/lisonge',
          homepageURL: `https://github.com/gkd-kit/network-extension`,
          author: `lisonge`,
          name: {
            '': name,
            'zh-CN': `网络扩展`,
          },
          description: {
            '': `Inject GM_XHR to Website`,
            'zh-CN': `注入GM_XHR到网站`,
          },
          match:
            command == 'serve'
              ? [`https://github.com/*`, `https://songe.li/*`]
              : [`http://*/*`, `https://*/*`],
          noframes: true,
          connect: `*`,
        },
        server: {
          prefix: false,
        },
        build: {
          fileName: name + '.user.js',
        },
      }),
    ],
  };
});
