const isTauri = () => {
  return window && window.__TAURI_IPC__;
};

const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

const findCurrentPathKey = (str) => {
  const lastSlashIndex = str.lastIndexOf("/");
  if (lastSlashIndex === -1) {
    // 如果没有找到斜杠，则返回整个字符串
    return str;
  } else {
    // 截取从最后一个斜杠之后的部分
    return str.substring(lastSlashIndex + 1);
  }
};

const findObjByKey = (array, targetId, key = "key") => {
  for (let obj of array) {
    if (obj[key] === targetId) {
      return obj;
    } else if (Array.isArray(obj.children)) {
      const found = findObjByKey(obj.children, targetId, key);
      if (found) {
        return found;
      }
    }
  }
  return null; // 如果没有找到匹配的对象，则返回 null
};

const routes2menu = (routes) => {
  return routes.reduce((acc, route) => {
    const { meta, children } = route;
    if (meta && !meta.hide_in_menu && meta.key && meta.label) {
      const menuItem = {
        key: meta.key,
        icon: meta.icon,
        label: meta.label,
      };

      if (children && children.length > 0) {
        const subMenuItems = routes2menu(children);
        if (subMenuItems.length > 0) {
          menuItem.children = subMenuItems;
        }
      }

      acc.push(menuItem);
    }

    return acc;
  }, []);
};

/* 根据表单项目 label 计算按钮偏移量 */
const computedWrapperCol = (labelCol) => {
  const keys = Object.keys(labelCol);
  let wrapperCol = {};
  keys.map((key) => {
    const offset = labelCol[key].span;
    wrapperCol = {
      ...wrapperCol,
      [key]: {
        offset,
      },
    };
  });
  return wrapperCol;
};

export {
  isTauri,
  getCurrentYear,
  findCurrentPathKey,
  findObjByKey,
  routes2menu,
  computedWrapperCol,
};
