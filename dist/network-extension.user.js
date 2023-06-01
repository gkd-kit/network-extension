// ==UserScript==
// @name         network-extension
// @namespace    https://github.com/lisonge
// @version      1.0.5
// @author       lisonge
// @description  network-extension
// @icon         https://vitejs.dev/logo.svg
// @match        http://*/*
// @match        https://*/*
// @connect      *
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  var delay = async (n = 0) => new Promise((res) => {
    setTimeout(res, n);
  });
  var parseHeaders = (rawHeaders = "") => {
    const headers = new Headers();
    const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
    preProcessedHeaders.split("\r").map(function(header) {
      return header.startsWith(`
`) ? header.substring(1) : header;
    }).forEach(function(line) {
      var _a;
      let parts = line.split(":");
      let key = (_a = parts.shift()) == null ? void 0 : _a.trim();
      if (key) {
        let value = parts.join(":").trim();
        headers.append(key, value);
      }
    });
    return headers;
  };
  var fixUrl = (url = "") => {
    try {
      return url === "" && location.href ? location.href : url;
    } catch {
      return url;
    }
  };
  var GM_fetch = async (input, init = {}, xhrDetails = {}) => {
    var _a;
    const request = new Request(input, init);
    if ((_a = request.signal) == null ? void 0 : _a.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    const data = await request.blob();
    let binary = true;
    const headers = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    new Headers(init.headers).forEach((value, key) => {
      headers[key] = value;
    });
    return new Promise((resolve, reject) => {
      var _a2;
      const handle = _GM_xmlhttpRequest({
        ...xhrDetails,
        method: request.method.toUpperCase(),
        url: fixUrl(request.url),
        headers,
        data,
        binary,
        responseType: "blob",
        timeout: 5e3,
        async onload(e) {
          await delay();
          const resp = new Response(e.response ?? e.responseText, {
            status: e.status,
            statusText: e.statusText,
            headers: parseHeaders(e.responseHeaders)
          });
          Object.defineProperty(resp, "url", { value: e.finalUrl });
          resolve(resp);
        },
        async onerror() {
          await delay();
          reject(new TypeError("Network request failed"));
        },
        async ontimeout() {
          await delay();
          reject(new TypeError("Network request failed"));
        },
        async onabort() {
          await delay();
          reject(new DOMException("Aborted", "AbortError"));
        },
        async onreadystatechange(response) {
          var _a3;
          if (response.readyState === 4) {
            (_a3 = request.signal) == null ? void 0 : _a3.removeEventListener("abort", abortXhr);
          }
        }
      });
      function abortXhr() {
        handle.abort();
      }
      (_a2 = request.signal) == null ? void 0 : _a2.addEventListener("abort", abortXhr);
    });
  };
  const useCheckedMenu = (name, initValue = false) => {
    let checked = initValue;
    const falseName = "❌ " + name;
    const trueName = "✅ " + name;
    const currentName = () => checked ? trueName : falseName;
    const register = () => {
      _GM_registerMenuCommand(currentName(), () => {
        onChange(!checked);
      });
    };
    const unregister = () => {
      _GM_unregisterMenuCommand(currentName());
    };
    let onChange = (checked2) => {
      controller.checked = checked2;
    };
    const controller = {
      get checked() {
        return checked;
      },
      set checked(newValue) {
        if (newValue == checked)
          return;
        unregister();
        checked = newValue;
        register();
      },
      get onChange() {
        return onChange;
      },
      set onChange(newFn) {
        onChange = newFn;
      }
    };
    register();
    return controller;
  };
  const defaultValue = [
    `gkd-viewer.songe.li`,
    `gkd-viewer.vercel.app`,
    `gkd-viewer.netlify.app`,
    `gkd-viewer.gitee.io`
  ].includes(location.hostname);
  const storeKey = `inject_network:` + location.origin;
  const menu = useCheckedMenu(
    `inject api to current website`,
    _GM_getValue(storeKey, defaultValue)
  );
  menu.onChange = (checked) => {
    menu.checked = checked;
    _GM_setValue(storeKey, checked);
    setTimeout(() => {
      location.reload();
    });
  };
  if (menu.checked) {
    const __GmNetworkExtension = {
      GM_xmlhttpRequest: _GM_xmlhttpRequest,
      GM_fetch
    };
    Object.assign(_unsafeWindow, { __GmNetworkExtension });
  }

})();
