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
          homepageURL: `https://github.com/gkd-kit/network-extension`,
          author: `lisonge`,
          name: {
            'zh-CN': `网络扩展`,
          },
          description: {
            '': `Inject GM_XHR to Website`,
            'zh-CN': `注入GM_XHR到网站`,
          },
          match:
            command == 'serve'
              ? [`https://github.com/*`]
              : [`http://*/*`, `https://*/*`],
          noframes: true,
          connect: `*`,
        },
      }),
    ],
  };
});
