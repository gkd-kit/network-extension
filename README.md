# network-extension

将 `GM_xmlhttpRequest` 注入 `unsafeWindow` 以绕过 cors 的限制

```ts
// if enabled, set
unsafeWindow.__NetworkExtension__ = {
  GM_xmlhttpRequest,
};
```

## 安装

点击以下任意链接安装

| 安装源    | 安装链接                                                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| npmmirror | [network-extension.user.js](https://registry.npmmirror.com/@gkd-kit/network-extension/latest/files/dist/network-extension.user.js) |
| jsdelivr  | [network-extension.user.js](https://fastly.jsdelivr.net/gh/gkd-kit/network-extension@main/dist/network-extension.user.js)          |
| github    | [network-extension.user.js](https://github.com/gkd-kit/network-extension/raw/main/dist/network-extension.user.js)                  |

## 使用

每个源(域名)的配置都是隔离的, 默认情况不启用注入, 点击下图中蓝色区域即可在当前源(域名)启用注入

![image](https://github.com/user-attachments/assets/a77192da-7043-49bc-8cfa-f383e8bd5046)

下图是启用注入后的示例, 前缀由 `❎` 变更为 `✅`

![image](https://github.com/user-attachments/assets/a2b880ab-ed77-4b23-8208-0cece78e9372)
