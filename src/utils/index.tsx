const isTauri = () => {
  return window && window.__TAURI_IPC__;
};

const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export { isTauri, getCurrentYear };
