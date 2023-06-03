import {
  GM_getValue,
  GM_setValue,
  GM_xmlhttpRequest,
  unsafeWindow,
  GM_info,
} from '$';
import { useCheckedMenu } from './utils';

const defaultValue = [
  `gkd-viewer.songe.li`,
  `gkd-viewer.vercel.app`,
  `gkd-viewer.netlify.app`,
  `gkd-viewer.gitee.io`,
].includes(location.hostname);

const storeKey = `inject_network:` + location.origin;
const menu = useCheckedMenu(
  `inject api to current website`,
  GM_getValue(storeKey, defaultValue),
);

menu.onChange = (checked) => {
  menu.checked = checked;
  GM_setValue(storeKey, checked);
  setTimeout(() => {
    location.reload();
  });
};

if (menu.checked) {
  const __GmNetworkExtension = {
    GM_info,
    GM_xmlhttpRequest,
  };
  Object.assign(unsafeWindow, { __GmNetworkExtension });
}
