import api from "@/api/index"
import { comGet, comPost, comPut, comGetFile } from "@/request/index"

// 菜单查询
const getMenuService = (params) => {
  return comGet(`${api.menu}`, params)
}

// 管理员查询
const getAdminService = (params) => {
  return comGet(`${api.user}/${params.id}`, params)
}

// 管理员查询
const getAdminByTokenService = (params) => {
  return comGet(api.token, params)
}

// 用户登录
const loginService = (data) => {
  return comPost(api.login, data)
}

// 用户注册
const registerService = (data) => {
  return comPost(api.register, data)
}

// 退出登录
const logoutService = (params) => {
  return comGet(api.logout, params)
}

// 看板数据
const getDashboardService = (params) => {
  return comGet(api.dashboard, params)
}

// 客户意向导出
const exportRecordService = (params) => {
  return comGetFile(api.export, params)
}

// 客户意向列表(分页)
const getRecordListService = (params) => {
  return comGet(api.records, params)
}

// 客户意向修改
const updateRecordService = (data) => {
  return comPut(`${api.records}/${data.id}`, data)
}

// 客户意向详情
const getRecordService = (params) => {
  return comGet(`${api.records}/${params.id}`, params)
}

export {
  getAdminService,
  getAdminByTokenService,
  loginService,
  registerService,
  logoutService,
  getDashboardService,
  exportRecordService,
  getRecordListService,
  updateRecordService,
  getRecordService,
  getMenuService
}
