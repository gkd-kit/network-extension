# network-extension

inject `GM_xmlhttpRequest` to `unsafeWindow`

some tool websites need `GM_xmlhttpRequest` api to request the resource of others origin

```ts
// if enabled, set
window.__GmNetworkExtension = {
  GM_xmlhttpRequest,
};
```

the config of every origin is isolated, and the default inject config is `false`

![2023-05-07_22-37-55](https://user-images.githubusercontent.com/38517192/236684172-1124bdc5-c9a8-43ba-9cda-9ae84f0bdd8d.gif)

## install

- from github [network-extension.user.js](https://github.com/lisonge/network-extension/raw/main/dist/network-extension.user.js)
