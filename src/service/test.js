const mockRoutes = () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: [
        {
          label: "",
          key: "root",
          path: "/",
          element: "@/component/LayouBase/index",
          icon: "",
          children: [
            {
              label: "控制台",
              key: "dashboard",
              path: "dashboard",
              element: "@/page/dashboard/index",
              icon: "DashboardOutlined",
              children: [{}]
            },
            {
              label: "客户意向",
              key: "record",
              path: "record",
              element: "@/page/record/index",
              icon: "FileProtectOutlined"
            },
            {
              label: "客户详情",
              key: "record:id",
              path: "record/:id",
              element: "@/page/record/detail",
              icon: ""
            },
            {
              label: "租户管理",
              key: "tenant",
              path: "tenant",
              element: "@/page/tenant/index",
              icon: "HomeOutlined",
              children: [{}]
            },
            {
              label: "应用管理",
              key: "application",
              path: "application",
              element: "@/page/application/index",
              icon: "AppstoreOutlined",
              children: [{}]
            },
            {
              label: "用户系统",
              key: "user",
              path: "user",
              icon: "TeamOutlined",
              children: [
                {
                  label: "用户列表",
                  key: "list",
                  path: "list",
                  element: "@/page/user/list/index",
                  icon: ""
                },
                {
                  label: "用户中心",
                  key: "center",
                  path: "center",
                  element: "@/page/user/center/index",
                  icon: ""
                },
                {
                  label: "个人信息",
                  key: "profile",
                  path: "profile",
                  element: "@/page/user/profile/index",
                  icon: "",
                  hide_in_menu: true
                },
                {
                  label: "个性配置",
                  key: "personal",
                  path: "personal",
                  element: "@/page/user/personal/index",
                  icon: "",
                  hide_in_menu: true
                }
              ]
            },
            {
              label: "权限系统",
              key: "permission",
              path: "permission",
              icon: "SafetyCertificateOutlined",
              children: [
                {
                  label: "后台用户",
                  key: "admin",
                  path: "admin",
                  element: "@/page/permission/admin/index",
                  icon: ""
                },
                {
                  label: "角色管理",
                  key: "role",
                  path: "role",
                  element: "@/page/permission/role/index",
                  icon: ""
                },
                {
                  label: "菜单管理",
                  key: "menu",
                  path: "menu",
                  element: "@/page/permission/menu/index",
                  icon: ""
                },
                {
                  label: "组织机构",
                  key: "organization",
                  path: "organization",
                  element: "@/page/permission/organization/index",
                  icon: ""
                },
                {
                  label: "部门管理",
                  key: "department",
                  path: "department",
                  element: "@/page/permission/department/index",
                  icon: ""
                },
                {
                  label: "岗位管理",
                  key: "position",
                  path: "position",
                  element: "@/page/permission/position/index",
                  icon: ""
                }
              ]
            },
            {
              label: "客服中心",
              key: "call",
              path: "call",
              icon: "CommentOutlined",
              children: [
                {
                  label: "意见反馈",
                  key: "feedback",
                  path: "feedback",
                  element: "@/page/call/feedback/index",
                  icon: ""
                },
                {
                  label: "评论列表",
                  key: "comment",
                  path: "comment",
                  element: "@/page/call/comment/index",
                  icon: ""
                },
                {
                  label: "申请列表",
                  key: "apply",
                  path: "apply",
                  element: "@/page/call/apply/index",
                  icon: ""
                }
              ]
            },
            {
              label: "统一消息",
              key: "message",
              path: "message",
              icon: "AlertOutlined",
              children: [
                {
                  label: "通知公告",
                  key: "notice",
                  path: "notice",
                  element: "@/page/message/notice/index",
                  icon: ""
                },
                {
                  label: "短信通知",
                  key: "sms",
                  path: "sms",
                  element: "@/page/message/sms/index",
                  icon: ""
                },
                {
                  label: "邮件通知",
                  key: "email",
                  path: "email",
                  element: "@/page/message/email/index",
                  icon: ""
                },
                {
                  label: "消息类型",
                  key: "type",
                  path: "type",
                  element: "@/page/message/type/index",
                  icon: ""
                }
              ]
            },
            {
              label: "基础数据",
              key: "basic",
              path: "basic",
              icon: "DatabaseOutlined",
              children: [
                {
                  label: "文件管理",
                  key: "file",
                  path: "file",
                  element: "@/page/basic/file/index",
                  icon: ""
                },
                {
                  label: "行政区划",
                  key: "area",
                  path: "area",
                  element: "@/page/basic/area/index",
                  icon: ""
                },
                {
                  label: "常见问题",
                  key: "question",
                  path: "question",
                  element: "@/page/basic/question/index",
                  icon: ""
                },
                {
                  label: "快捷入口",
                  key: "quick",
                  path: "quick",
                  element: "@/page/basic/quick/index",
                  icon: ""
                }
              ]
            },
            {
              label: "系统设置",
              key: "system",
              path: "system",
              icon: "SettingOutlined",
              children: [
                {
                  label: "系统信息",
                  key: "info",
                  path: "info",
                  element: "@/page/system/info/index",
                  icon: ""
                },
                {
                  label: "系统字典",
                  key: "dictionary",
                  path: "dictionary",
                  element: "@/page/system/dictionary/index",
                  icon: ""
                },
                {
                  label: "全局参数",
                  key: "parameter",
                  path: "parameter",
                  element: "@/page/system/parameter/index",
                  icon: ""
                },
                {
                  label: "站点SEO",
                  key: "seo",
                  path: "seo",
                  element: "@/page/system/seo/index",
                  icon: ""
                },
                {
                  label: "邮箱设置",
                  key: "mailbox",
                  path: "mailbox",
                  element: "@/page/system/mailbox/index",
                  icon: ""
                },
                {
                  label: "地图密钥",
                  key: "map",
                  path: "map",
                  element: "@/page/system/map/index",
                  icon: ""
                }
              ]
            },
            {
              label: "数据监控",
              key: "data",
              path: "data",
              icon: "CloudServerOutlined",
              children: [
                {
                  label: "在线用户",
                  key: "online",
                  path: "online",
                  element: "@/page/data/online/index",
                  icon: "",
                  children: [{}]
                },
                {
                  label: "日志记录",
                  key: "log",
                  path: "log",
                  element: "@/page/data/logo/index",
                  icon: "",
                  children: [{}]
                },
                {
                  label: "数据备份",
                  key: "backup",
                  path: "backup",
                  element: "@/page/data/backup/index",
                  icon: "",
                  children: [{}]
                },
                {
                  label: "定时任务",
                  key: "cron",
                  path: "log",
                  element: "@/page/data/cron/index",
                  icon: "",
                  children: [{}]
                },
                {
                  label: "运行资源",
                  key: "run",
                  path: "run",
                  element: "@/page/data/run/index",
                  icon: "",
                  children: [{}]
                },
                {
                  label: "缓存监控",
                  key: "cache",
                  path: "cache",
                  element: "@/page/data/cache/index",
                  icon: "",
                  children: [{}]
                }
              ]
            },
            {
              label: "403",
              key: "403",
              path: "403",
              element: "@/page/result/403",
              icon: "",
              hide_in_menu: true
            },
            {
              label: "500",
              key: "500",
              path: "500",
              element: "@/page/result/500",
              icon: "",
              hide_in_menu: true
            },
            {
              label: "404",
              key: "404",
              path: "*",
              element: "@/page/result/404",
              icon: "",
              hide_in_menu: true
            }
          ]
        },
        {
          label: "注册",
          key: "register",
          path: "register",
          element: "@/page/login/index",
          icon: "",
          hide_in_menu: true
        },
        {
          label: "登录",
          key: "login",
          path: "login",
          element: "@/page/register/index",
          icon: "",
          hide_in_menu: true
        }
      ]
    })
  })
}

export { mockRoutes }
