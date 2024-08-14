import { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  List,
  Input,
  Button,
  Dropdown,
  Flex,
  Space,
  Drawer,
} from "antd";
import {
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  CodeOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import WinCode from "@/component/Code";
import SuperForm from "@/component/SuperForm";

const { Search } = Input;
import "./index.css";

const Function = () => {
  const formRef = useRef();
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [record, setRecord] = useState({});

  useEffect(() => {
    setCode("const name = winbase");
  }, []);

  const showDrawer = (bool, record) => {
    setAction(bool);
    setOpen(true);
    console.log({ record });
    setRecord(record);
  };
  const onClose = () => {
    setOpen(false);
  };

  const data = [
    "getUserList",
    "refreshToken",
    "findRole",
    "adminFnCall",
    "categoryList",
  ];

  const items = [
    {
      label: "修改",
      key: "1",
      icon: <EditOutlined />,
    },
    {
      label: "编码",
      key: "2",
      icon: <CodeOutlined />,
    },
    {
      label: "删除",
      key: "3",
      icon: <DeleteOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formData = [
    {
      label: "数据表名称",
      name: "table_name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入数据表名称",
    },
    {
      label: "数据表描述",
      name: "description",
      is: "Input.TextArea",
      itemSpan: 24,
      placeholder: "请输入数据表描述",
    },
  ];

  const onFinish = () => {
    formRef?.current?.form
      .validateFields()
      .then(async (values) => {
        console.log({ values });
      })
      .catch(() => {});
  };

  const onCodeChange = (delta, content) => {
    // console.log({ delta, content });
  };

  const onAddFn = () => {
    showDrawer(true);
    setCode("");
  };

  const handleMenuClick = (e) => {
    if (e.key == 1) {
      showDrawer(false, e.item);
    }
  };

  return (
    <Row gutter={24} style={{ height: "100%" }}>
      <Col span={4}>
        <List
          header={<Search placeholder="搜索云函数" />}
          footer={
            <Button type="text" block icon={<PlusOutlined />} onClick={onAddFn}>
              新建云函数
            </Button>
          }
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item}>
              <List.Item.Meta title={item} />
              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                placement="bottomLeft"
              >
                <Button type="text" icon={<MoreOutlined />}></Button>
              </Dropdown>
            </List.Item>
          )}
        />
      </Col>
      <Col span={20} style={{ height: "100%" }}>
        <Flex vertical gap={24} style={{ height: "100%" }}>
          <Space size="middle">
            <Button icon={<SaveOutlined />}>保存代码</Button>
            <Button icon={<CodeOutlined />}>执行代码</Button>
          </Space>

          <WinCode initialValue={code} onChange={onCodeChange} />
        </Flex>
      </Col>

      <Drawer
        title={`${action ? "新增" : "编辑"}云函数`}
        onClose={onClose}
        open={open}
        footer={
          <Flex justify="flex-end">
            <Space>
              <Button onClick={onClose}>取消</Button>
              <Button type="primary" onClick={onFinish}>
                确认
              </Button>
            </Space>
          </Flex>
        }
      >
        <SuperForm
          ref={formRef}
          data={formData}
          layout={layout}
          limit={6}
          initialValues={record}
          rulesValid={false}
          btnAction={false}
        ></SuperForm>
      </Drawer>
    </Row>
  );
};

export default Function;
