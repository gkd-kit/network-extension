# network-extension

将 `GM_xmlhttpRequest` 注入 `unsafeWindow` 以绕过 cors 的限制

```ts
// if enabled, set
unsafeWindow.__NetworkExtension__ = {
  GM_xmlhttpRequest,
};
```

每个源(域名)的配置都是隔离的, 默认情况不启用注入, 点击下图中蓝色区域即可在当前源(域名)启用注入

![image](https://github.com/gkd-kit/selector/assets/38517192/995ca497-a73b-4119-9afd-8161f9d303e2)

下图是启用注入后的示例

![image](https://github.com/gkd-kit/network-extension/assets/38517192/97ee0a77-67f4-4fad-b068-3519097e6e45)

## 安装

点击以下任意链接安装

- from github [network-extension.user.js](https://github.com/gkd-kit/network-extension/raw/main/dist/network-extension.user.js)

- from fastly jsdelivr [network-extension.user.js](https://fastly.jsdelivr.net/gh/gkd-kit/network-extension@main/dist/network-extension.user.js)

- from cdn jsdelivr [network-extension.user.js](https://cdn.jsdelivr.net/gh/gkd-kit/network-extension@main/dist/network-extension.user.js)
