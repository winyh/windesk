import { useEffect, useState } from "react";
import {
  Col,
  Row,
  List,
  Input,
  Flex,
  Space,
  Button,
  Dropdown,
  Table,
  Segmented,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  CodeOutlined,
  TableOutlined,
  SendOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import useStore from "@/store/index";
import WinCode from "@/component/Code";

const { Search } = Input;

const Database = () => {
  const antdThemeMode = useStore((state) => state.themeMode);
  const [mode, setMode] = useState("table");
  const [selectedRows, setSelectedRows] = useState([]);
  const [themeMode, setThemeMode] = useState();
  const data = ["user", "article", "role", "admin", "category"];

  useEffect(() => {
    setThemeMode(antdThemeMode);
  }, [antdThemeMode]);

  const items = [
    {
      label: "修改",
      key: "1",
      icon: <EditOutlined />,
    },
    {
      label: "配置",
      key: "2",
      icon: <SettingOutlined />,
    },
    {
      label: "删除",
      key: "3",
      icon: <DeleteOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "文件ID",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "文件后缀",
      dataIndex: "suffix",
      key: "suffix",
    },
    {
      title: "大小",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
    },
  ];

  const onModeChange = (value) => {
    setMode(value);
  };

  const onCodeChange = (delta, content) => {
    // console.log({ delta, content });
  };

  const onConfirm = () => {};

  const onCancel = () => {};

  return (
    <Row gutter={24} style={{ height: "100%" }}>
      <Col span={4}>
        <List
          header={<Search placeholder="搜索数据表" />}
          footer={
            <Button type="text" block icon={<PlusOutlined />}>
              新增数据表
            </Button>
          }
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomLeft"
                >
                  <Button type="text" icon={<MoreOutlined />}></Button>
                </Dropdown>,
              ]}
            >
              {item}
            </List.Item>
          )}
        />
      </Col>
      <Col span={20}>
        <Flex vertical gap="middle" style={{ height: "100%" }}>
          <Flex justify="space-between">
            <Space size="middle">
              <Segmented
                options={[
                  {
                    label: "Table",
                    value: "table",
                    icon: <TableOutlined />,
                  },
                  {
                    label: "SQL",
                    value: "sql",
                    icon: <CodeOutlined />,
                  },
                ]}
                value={mode}
                onChange={onModeChange}
              ></Segmented>
              {mode === "table" ? (
                <Space>
                  {selectedRows.length > 0 ? (
                    <Popconfirm
                      title="系统提醒"
                      description="您确认要删除租户吗?"
                      onConfirm={onConfirm}
                      onCancel={onCancel}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button danger>批量删除</Button>
                    </Popconfirm>
                  ) : null}
                  <Search placeholder="搜索数据" />
                </Space>
              ) : null}
            </Space>
            <Space size="middle">
              {mode === "table" ? (
                <Space>
                  <Button>API / GraphQL</Button>
                  <Button icon={<PlusOutlined />}>新增记录</Button>
                </Space>
              ) : (
                <Button icon={<SendOutlined />}>运行脚本</Button>
              )}
            </Space>
          </Flex>
          {mode === "table" ? (
            <Table
              rowSelection={{
                ...rowSelection,
              }}
              rowKey={(record) => record.key}
              dataSource={dataSource}
              columns={columns}
              pagination={{
                position: ["bottomCenter"],
                showSizeChanger: true,
                showQuickJumper: true,
                onShowSizeChange: { onShowSizeChange },
                defaultCurrent: 3,
                total: 500,
              }}
            />
          ) : (
            <WinCode
              initialValue="SELECT * FROM users"
              options={{ useWorker: false }}
              mode="sql"
              theme={themeMode}
              onChange={onCodeChange}
            />
          )}
        </Flex>
      </Col>
    </Row>
  );
};

export default Database;
