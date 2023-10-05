# network-extension

将 `GM_xmlhttpRequest` 注入 `unsafeWindow` 以绕过 cors 的限制

```ts
// if enabled, set
unsafeWindow.__NetworkExtension__ = {
  GM_xmlhttpRequest,
};
```

the config of every origin is isolated, and the default inject config is `false`

![image](https://github.com/gkd-kit/network-extension/assets/38517192/97ee0a77-67f4-4fad-b068-3519097e6e45)

## install

- from github [network-extension.user.js](https://github.com/gkd-kit/network-extension/raw/main/dist/network-extension.user.js)

- from fastly jsdelivr [network-extension.user.js](https://fastly.jsdelivr.net/gh/gkd-kit/network-extension@main/dist/network-extension.user.js)

- from cdn jsdelivr [network-extension.user.js](https://cdn.jsdelivr.net/gh/gkd-kit/network-extension@main/dist/network-extension.user.js)
