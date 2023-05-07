# network-extension

inject `GM_xmlhttpRequest` to `unsafeWindow`

some tool websites need `GM_xmlhttpRequest` api to request the resource of others origin

```ts
// if enabled, set
window.__GmNetworkExtension = {
  GM_xmlhttpRequest,
  GM_fetch,
};
```

## install

- from github [network-extension.user.js](https://github.com/lisonge/network-extension/raw/main/dist/network-extension.user.js)
