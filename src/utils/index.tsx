import dayjs from "dayjs";
const isTauri = () => {
  return Boolean(window?.__TAURI_INTERNALS__);
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

// 隐藏菜单不过滤
const getMenuSome = (routes) => {
  return routes.reduce((acc, route) => {
    const { meta, children } = route;
    if (meta && meta.key && meta.label) {
      const menuItem = {
        key: meta.key,
        icon: meta.icon,
        label: meta.label,
      };

      if (children && children.length > 0) {
        const subMenuItems = getMenuSome(children);
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

const genMenuToTree = (items = []) => {
  const result = []; // 存放结果集
  const itemMap = {}; // 存放路径

  // 先转化为map存储，并增加key键
  for (const item of items) {
    item.children = [];
    item.key = item.id; // 增加key键，值为id的值
    itemMap[item.id] = item;
  }

  for (const item of items) {
    const pid = item.pid;

    if (pid === 0) {
      result.push(item);
    } else {
      if (!itemMap[pid]) {
        // 如果父节点不存在，则忽略此节点
        continue;
      }
      itemMap[pid].children.push(item);
    }
  }

  // 对每个层级进行sort排序
  const sortItems = (arr) => {
    arr.sort((a, b) => a.sort - b.sort);
    arr.forEach((item) => {
      if (item.children && item.children.length > 0) {
        sortItems(item.children);
      } else {
        item.isLeaf = true;
      }
    });
  };

  sortItems(result);

  return result;
};

const genOptions = (data) => {
  return data.map((item) => {
    // 创建一个新对象，重命名属性
    const newItem = {
      value: item.id, // 将 id 改为 value
      label: item.name, // 将 name 改为 label
      children: item.children.length > 0 ? genOptions(item.children) : [], // 递归处理子节点
    };
    return newItem;
  });
};

const transBool2Str = (field) => {
  return field ? "1" : "0";
};

const transBool2num = (field) => {
  return field ? 1 : 0;
};

// 表单初始值设置时间格式处理
const setDayjsTrans = (values) => {
  Object.keys(values).map((item) => {
    if (
      item === "created_at" ||
      item === "expired_at" ||
      item === "start_at" ||
      item === "end_at" ||
      item === "updated_at"
    ) {
      if (Array.isArray(values[item])) {
        values.item = [dayjs(values[item][0]), dayjs(values[item][1])];
      } else {
        values[item] = dayjs(values[item]);
      }
    }
  });
  return values;
};

// 表单值获取时间格式处理
const getDayjsTrans = (values, format) => {
  Object.keys(values).map((item) => {
    if (Array.isArray(values[item])) {
      if (values[item][0].isDayjsObject && values[item][1].isDayjsObject) {
        values.start_at = dayjs(values[item][0]).format(format);
        values.end_at = dayjs(values[item][1]).format(format);
        delete values[item];
      }
    } else {
      if (values[item] && values[item].isDayjsObject) {
        values[item] = dayjs(values[item]).format(format);
      }
    }
  });
  return values;
};

export {
  isTauri,
  getCurrentYear,
  findCurrentPathKey,
  findObjByKey,
  routes2menu,
  getMenuSome,
  computedWrapperCol,
  genMenuToTree,
  genOptions,
  transBool2Str,
  transBool2num,
  setDayjsTrans,
  getDayjsTrans,
};
