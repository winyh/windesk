const isTauri = () => {
    return window && window.__TAURI_IPC__
}

export { isTauri }