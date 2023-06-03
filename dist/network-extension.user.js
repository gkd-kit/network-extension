// ==UserScript==
// @name         network-extension
// @namespace    https://github.com/lisonge
// @version      1.0.6
// @author       lisonge
// @description  network-extension
// @icon         https://vitejs.dev/logo.svg
// @match        http://*/*
// @match        https://*/*
// @connect      *
// @grant        GM_getValue
// @grant        GM_info
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
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
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
      GM_info: _GM_info,
      GM_xmlhttpRequest: _GM_xmlhttpRequest
    };
    Object.assign(_unsafeWindow, { __GmNetworkExtension });
  }

})();
