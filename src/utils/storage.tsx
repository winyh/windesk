export class Storage {
  // 检查 storage 是否支持
  static isStorageSupported(storage) {
    try {
      const testKey = "__test__";
      storage.setItem(testKey, "test");
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // 设置数据，支持过期时间（单位：毫秒）
  static setItem(key, value, expiresIn = null, storageType = "local") {
    const storage = storageType === "session" ? sessionStorage : localStorage;
    if (this.isStorageSupported(storage)) {
      const item = {
        value: value,
        expiry: expiresIn ? Date.now() + expiresIn : null, // 仅在提供过期时间时设置
      };
      storage.setItem(key, JSON.stringify(item));
    } else {
      console.warn(
        `${storageType}Storage is not supported. Using cookies as fallback.`
      );
      const expiryDate = expiresIn
        ? new Date(Date.now() + expiresIn).toUTCString()
        : null;
      document.cookie = `${key}=${encodeURIComponent(
        JSON.stringify(value)
      )}; path=/; ${expiryDate ? "expires=" + expiryDate : ""}`;
    }
  }

  // 获取数据
  static getItem(key, storageType = "local") {
    const storage = storageType === "session" ? sessionStorage : localStorage;
    if (this.isStorageSupported(storage)) {
      const item = JSON.parse(storage.getItem(key));
      if (item) {
        // 检查是否过期
        if (item.expiry && Date.now() > item.expiry) {
          this.removeItem(key, storageType); // 如果过期了，删除该项
          return null;
        }
        return item.value;
      }
      return null;
    } else {
      console.warn(`${storageType}Storage is not supported. Checking cookies.`);
      const cookieMatch = document.cookie.match(
        new RegExp("(^| )" + key + "=([^;]+)")
      );
      return cookieMatch
        ? JSON.parse(decodeURIComponent(cookieMatch[2]))
        : null;
    }
  }

  // 删除数据
  static removeItem(key, storageType = "local") {
    const storage = storageType === "session" ? sessionStorage : localStorage;
    if (this.isStorageSupported(storage)) {
      storage.removeItem(key);
    } else {
      console.warn(`${storageType}Storage is not supported. Removing cookie.`);
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }

  // 清空所有数据
  static clear(storageType = "local") {
    const storage = storageType === "session" ? sessionStorage : localStorage;
    if (this.isStorageSupported(storage)) {
      storage.clear();
    } else {
      console.warn(
        `${storageType}Storage is not supported. Clearing cookies is not implemented.`
      );
    }
  }

  // 获取所有存储的键
  static getAllKeys(storageType = "local") {
    const storage = storageType === "session" ? sessionStorage : localStorage;
    if (this.isStorageSupported(storage)) {
      return Object.keys(storage);
    } else {
      console.warn(
        `${storageType}Storage is not supported. Returning empty array.`
      );
      return [];
    }
  }

  // 检查某个键是否存在
  static exists(key, storageType = "local") {
    return this.getItem(key, storageType) !== null;
  }
}
