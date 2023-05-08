import { GM_registerMenuCommand, GM_unregisterMenuCommand } from '$';

export const useCheckedMenu = (name: string, initValue = false) => {
  let checked = initValue;
  const falseName = '❌\x20' + name;
  const trueName = '✅\x20' + name;
  const currentName = () => (checked ? trueName : falseName);
  const register = () => {
    GM_registerMenuCommand(currentName(), () => {
      onChange(!checked);
    });
  };
  const unregister = () => {
    GM_unregisterMenuCommand(currentName());
  };

  let onChange = (checked: boolean) => {
    controller.checked = checked;
  };

  const controller = {
    get checked() {
      return checked;
    },
    set checked(newValue: boolean) {
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
    },
  };
  register();
  return controller;
};
