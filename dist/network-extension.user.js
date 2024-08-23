// ==UserScript==
// @name               network-extension
// @name:zh-CN         网络扩展
// @namespace          https://github.com/lisonge
// @version            1.0.7
// @author             lisonge
// @description        Inject GM_XHR to Website
// @description:zh-CN  注入GM_XHR到网站
// @icon               https://vitejs.dev/logo.svg
// @homepageURL        https://github.com/gkd-kit/network-extension
// @match              http://*/*
// @match              https://*/*
// @connect            *
// @grant              GM_getValue
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @grant              GM_unregisterMenuCommand
// @grant              GM_xmlhttpRequest
// @grant              unsafeWindow
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
  const useCheckedMenu = ({
    checkedTag = "✅ ",
    checkedName = "",
    uncheckedTag = "❎ ",
    uncheckedName = void 0,
    initValue = false
  }) => {
    let checked = initValue;
    const trueName = checkedTag + checkedName;
    const falseName = uncheckedTag + (uncheckedName ?? checkedName);
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
        if (newValue == checked) return;
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
  const storeKey = `inject_network:` + location.origin;
  const nameI18n = {
    "zh-CN": `注入GM_XHR到当前网站`,
    "": `Inject GM_XHR to Website`
  };
  const menu = useCheckedMenu({
    checkedName: nameI18n[navigator.language] ?? nameI18n[""],
    initValue: _GM_getValue(storeKey, false)
  });
  menu.onChange = (checked) => {
    menu.checked = checked;
    _GM_setValue(storeKey, checked);
    setTimeout(() => {
      location.reload();
    });
  };
  if (menu.checked) {
    _unsafeWindow.__NetworkExtension__ = {
      GM_xmlhttpRequest: _GM_xmlhttpRequest
    };
  }

})();