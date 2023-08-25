import { GM_getValue, GM_setValue, GM_xmlhttpRequest, unsafeWindow } from '$';
import { useCheckedMenu } from './utils';

const storeKey = `inject_network:` + location.origin;
const nameI18n: Record<string, string> = {
  'zh-CN': `注入GM_XHR到当前网站`,
  '': `Inject GM_XHR to Website`,
};
const menu = useCheckedMenu({
  checkedName: nameI18n[navigator.language] ?? nameI18n[''],
  initValue: GM_getValue(storeKey, false),
});

menu.onChange = (checked) => {
  menu.checked = checked;
  GM_setValue(storeKey, checked);
  setTimeout(() => {
    location.reload();
  });
};

if (menu.checked) {
  // @ts-ignore
  unsafeWindow.__NetworkExtension__ = {
    GM_xmlhttpRequest,
  };
}
