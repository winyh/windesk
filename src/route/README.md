## 唯一 ID

1. 应用 ID
2. 表单 ID
3. 页面 ID
4. 模板 ID
5. 组件 ID
6. 字段 ID {字段描述}
7. 数据 ID
8. 类型/验证 ID
9. 视图概念
10. 运行时
11. 设计时（运行时-设计时是针对组件而言）

## 路由设计

### Saas 模块

/saas/dashboard 数据分析：展示总览信息

/saas/tenant 租户管理

/saas/project 项目管理-应用列表和入口

/saas/analysis 数据分析：总览数据分析（内容暂时放控制台，多了再开放这个）

/saas/authority 平台权限：Saas 平台权限（应用级的权限-在应用体系实现）

/saas/system 系统配置

/saas/system/log 日志信息

/saas/system/common 通用配置

以下的 4 项放在一个路由：common

1.数据库：平台提供的数据库基础设施

2.云函数：存储配置

3.文件存储：存储路径配置

4.智能助手：key 相关配置

/saas/user 平台账户

### App 应用模块

/app/:appId/dashboard 控制台

/app/:appId/database 数据库

/app/:appId/function 云函数

/app/:appId/storage 文件存储

/app/:appId/agent 智能助手

/app/:appId/analysis 应用监控

/app/:appId/authority 应用权限 （/app/:appId/nav 导航管理）

/app/:appId/system 应用配置

/app/:appId/user 应用账户

/app/:appId/key 应用密钥 ✅

/app/:appId/publish 应用发布 ✅

### Page 应用页面

/app/:appId/page 页面

/app/:appId/template/:templateId 页面模板

/app/:appId/page/:pageId 页面详情 ✅

/app/:appId/page/:pageId/:tense 页面时态（design 设计时 / preview 预览 / runtime 运行时） ✅

/app/:appId/page/:pageId/runtime/create 运行时数据新增 ✅

/app/:appId/page/:pageId/runtime/edit 运行时数据修改 ✅

/app/:appId/page/:pageId/runtime/view 运行时数据详情 ✅
