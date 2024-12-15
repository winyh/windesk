import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Tabs, Table, Tag, Button, Typography, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { comGet } from "@/request";
import { logoutService } from "@/service/index";
import { Storage } from "@/utils/storage";
import { message } from "@/store/hooks";

const { Text } = Typography;
const Log = () => {
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState("operate");
  const [loading, setLoading] = useState(false);
  const [operateDataSource, setOperateDataSource] = useState([]);
  const [accountDataSource, setAccountDataSource] = useState([]);
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });

  useEffect(() => {
    getLogData({
      current: 1,
      pageSize: 10,
      log: activeKey,
    });
  }, []);

  const getLogData = async (params) => {
    setLoading(true);
    const res = await comGet("/admin/log/list", { ...params });
    if (res.status) {
      const { list, total, current, pageSize } = res.data;
      if (params.log === "operate") {
        setOperateDataSource(list);
      } else {
        setAccountDataSource(list);
      }

      setPaginationMeta({
        pageSize: pageSize,
        current: current,
        total: total,
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  //  强制退出
  const onForceLogout = async (row) => {
    try {
      const { data, status } = await logoutService();
      if (status) {
        Storage.removeItem("token");
        const { pathname, search } = window.location;
        message.open({
          type: "loading",
          content: "即将强制退出登录!",
          duration: 0,
        });
        setTimeout(() => {
          message.destroy();
          navigate(`/login?redirect=${pathname}${search}`);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const operateColumns = [
    // {
    //   title: "操作人",
    //   dataIndex: "username",
    //   key: "username",
    // },
    // {
    //   title: "操作内容",
    //   dataIndex: "action",
    //   key: "action", // 用户退出、查询树列表、分页查询列表等
    // },
    // {
    //   title: "所属模块",
    //   dataIndex: "module",
    //   key: "module", // 登录、用户管理、系统日志等
    // },
    {
      title: "操作地点",
      dataIndex: "location",
      key: "location",
      render: (text) => (text ? text : "未知"),
    },
    {
      title: "操作 IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "请求路径",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "请求方法",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "查询参数",
      dataIndex: "query",
      key: "query",
      render: (text) => {
        return (
          <Text style={{ width: 100 }} ellipsis={{ tooltip: text }}>
            {text}
          </Text>
        );
      },
    },
    {
      title: "耗时",
      dataIndex: "time",
      key: "time", // 58ms、100ms、8ms
      render: (text) => <Tag color="green">{text} ms</Tag>,
    },
    {
      title: "浏览器",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "操作系统",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status", // 成功、失败
      render: (text) => <Tag color={text > 300 ? "red" : "green"}>{text}</Tag>,
    },
    {
      title: "操作时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  const accountColumns = [
    {
      title: "会话编号",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "用户账号",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "登录行为",
      dataIndex: "login",
      key: "login", // 账号登录、账号退出
      render: (text) => (
        <Tag color={text === "账号登录" ? "green" : "yellow"}>{text}</Tag>
      ),
    },
    {
      title: "登录 IP",
      dataIndex: "ip",
      key: "ip",
      render: (text) => (text ? text : "未知"),
    },
    {
      title: "登录地点",
      dataIndex: "location",
      key: "location",
      render: (text) => (text ? text : "未知"),
    },
    {
      title: "浏览器",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "操作系统",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status", // 成功、失败
      render: (text) => <Tag color={text > 300 ? "red" : "green"}>{text}</Tag>,
    },
    {
      title: "登录时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (text, row) => (
        <Popconfirm
          title="系统提醒"
          description="您确认要强制该用户退出登录吗?"
          onConfirm={() => onForceLogout(row)}
          okText="确认"
          cancelText="取消"
        >
          <Button type="text" danger>
            强制退出
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const onChange = (key) => {
    setActiveKey(key);
    getLogData({
      current: 1,
      pageSize: 10,
      log: key,
    });
  };

  const onPaginationChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getLogData({ current, pageSize, log: activeKey });
  };

  const onShowSizeChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getLogData({ current, pageSize, log: activeKey });
  };

  const tabItems = [
    {
      label: "操作日志",
      key: "operate",
      children: (
        <Table
          dataSource={operateDataSource}
          columns={operateColumns}
          rowKey={(record) => record?.session}
          loading={loading}
          pagination={
            operateDataSource.length > 0 && {
              position: ["bottomCenter"],
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: onPaginationChange,
              onShowSizeChange: onShowSizeChange,
              pageSize: paginationMeta.pageSize, // 每页显示记录数
              current: paginationMeta.current, // 当前页码
              total: paginationMeta.total, // 总记录数
            }
          }
        />
      ),
    },
    {
      label: "登录日志",
      key: "login",
      children: (
        <Table
          dataSource={accountDataSource}
          columns={accountColumns}
          rowKey={(record) => record?.session}
          loading={loading}
          pagination={
            accountDataSource.length > 0 && {
              position: ["bottomCenter"],
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: onPaginationChange,
              onShowSizeChange: onShowSizeChange,
              pageSize: paginationMeta.pageSize, // 每页显示记录数
              current: paginationMeta.current, // 当前页码
              total: paginationMeta.total, // 总记录数
            }
          }
        />
      ),
    },
  ];

  return (
    <Tabs
      type="card"
      activeKey={activeKey}
      items={tabItems}
      onChange={onChange}
    />
  );
};
export default Log;
