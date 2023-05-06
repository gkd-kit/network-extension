import { unsafeWindow, GM_xmlhttpRequest } from '$';
import { GM_fetch } from 'monkey-extra';

const GmNetworkExtension = {
  GM_xmlhttpRequest,
  GM_fetch,
};

Object.assign(unsafeWindow, { GmNetworkExtension });
