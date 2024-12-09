// 设置数据，默认使用 localStorage，不设置过期时间（永久有效）
Storage.setItem('username', 'JohnDoe');

// 设置数据，使用 sessionStorage，过期时间为 10 秒
Storage.setItem('sessionUsername', 'JaneDoe', 10000, 'session');

// 获取 localStorage 数据
const username = Storage.getItem('username');
console.log(username); // 输出: JohnDoe

// 获取 sessionStorage 数据
const sessionUsername = Storage.getItem('sessionUsername', 'session');
console.log(sessionUsername); // 输出: JaneDoe

// 等待 11 秒后检查 sessionStorage 数据
setTimeout(() => {
const expiredSessionUsername = Storage.getItem('sessionUsername', 'session');
console.log(expiredSessionUsername); // 输出: null （因为数据已过期）
}, 11000);

// 删除数据
Storage.removeItem('username'); // 默认使用 localStorage
Storage.removeItem('sessionUsername', 'session'); // 使用 sessionStorage

// 清空所有数据
Storage.clear(); // 默认清空 localStorage
Storage.clear('session'); // 清空 sessionStorage

// 获取所有存储的键
const localKeys = Storage.getAllKeys();
console.log(localKeys); // 输出: 存储的所有 localStorage 键的数组

const sessionKeys = Storage.getAllKeys('session');
console.log(sessionKeys); // 输出: 存储的所有 sessionStorage 键的数组
