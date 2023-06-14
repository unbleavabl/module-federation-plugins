
export const loadComponent = (scope, module) => {
  return async () => {
    // eslint-disable-next-line
    await __webpack_init_sharing__("default");
    const container = window[scope];
    // eslint-disable-next-line
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}


