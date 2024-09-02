import { useState, useEffect } from "react";
import { Tabs, Table, Tag, Button } from "antd";
import "./index.less";
import { comGet } from "@/request";
import dayjs from "dayjs";
const Log = () => {
  const [activeKey, setActiveKey] = useState("operate");
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
    const res = await comGet("/admin/log/list", { ...params });
    if (res.status) {
      const { list, total, current, pageSize } = res.data;

      if (params.log === "operate") {
        console.log({ activeKey });
        let data = list.map((item) => {
          const [
            timestamp,
            type,
            level,
            device,
            ip,
            method,
            path,
            query,
            browser,
            os,
            cpu,
            time,
            status,
          ] = item.split(/\s+/);
          return {
            timestamp,
            type,
            level,
            device,
            ip,
            method,
            path,
            query,
            browser,
            os,
            cpu,
            time,
            status,
          };
        });
        setOperateDataSource(data);
      } else {
        let data = list.map((item) => {
          const [
            timestamp,
            type,
            level,
            device,
            ip,
            method,
            path,
            query,
            browser,
            os,
            cpu,
            time,
            status,
          ] = item.split(/\s+/);
          return {
            timestamp,
            type,
            level,
            device,
            ip,
            method,
            path,
            query,
            browser,
            os,
            cpu,
            time,
            status,
          };
        });
        setAccountDataSource(data);
      }

      setPaginationMeta({
        pageSize: pageSize,
        current: current,
        total: total,
      });
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
      title: "操作 IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "操作地点",
      dataIndex: "location",
      key: "location",
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
      render: (text) => <Tag color="green">{text ? text : "未知"}</Tag>,
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
      dataIndex: "code",
      key: "code",
    },
    {
      title: "登录昵称",
      dataIndex: "nick_name",
      key: "nick_name",
    },
    {
      title: "登录行为",
      dataIndex: "action",
      key: "action", // 账号登录、账号退出
    },
    {
      title: "登录 IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "登录地点",
      dataIndex: "location",
      key: "location",
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
    },
    {
      title: "登录时间",
      dataIndex: "login_at",
      key: "login_at",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (text, row) => (
        <Button type="text" danger>
          强制退出
        </Button>
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
          rowKey={(record) => record.timestamp}
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
          rowKey={(record) => record.timestamp}
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
