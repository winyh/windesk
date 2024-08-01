const prefix = "/admin"

const api = {
  menu: prefix + "/menus", // 菜单查询
  user: prefix + "/user", // 管理员查询
  token: prefix + "/token", // token 查询管理员
  login: prefix + "/login", // 用户登录
  register: prefix + "/register", // 用户注册
  logout: prefix + "/logout", // 退出登录
  dashboard: prefix + "/dashboard", // 看板数据,
  export: prefix + "/record/export", // 客户意向导出
  records: prefix + "/records" // 客户意向列表-修改-详情
}

export default api
