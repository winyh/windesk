import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Flex,
  Table,
  Space,
  Input,
  Button,
  Divider,
  Drawer,
  Popconfirm,
  Alert,
  Steps,
} from "antd";
import {
  PlusOutlined,
  CloudServerOutlined,
  BorderlessTableOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import SuperForm from "@/component/SuperForm";
import dayjs from "dayjs";
import {
  clientPost,
  clientPut,
  clientGetList,
  clientDelete,
  comPost,
  comPut,
  comDelete,
} from "@/request";
import { message } from "@/store/hooks";
import { genAlphabetId, genAlphabetFieldId } from "@/utils/index";
import { pageTypeEnum } from "@/config/enum";

const { Search } = Input;

const Form = () => {
  const { appId } = useParams();

  const formRef = useRef();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(true);

  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({
    pageSize: 10,
    current: 1,
    total: 10,
  });
  const [record, setRecord] = useState({});

  useEffect(() => {
    getData({
      current: 1,
      pageSize: 10,
    });
  }, []);

  const getData = (params = {}) => {
    setLoading(true);
    const { current, pageSize } = paginationMeta;
    clientGetList("project", "form", {
      current,
      pageSize,
      ...params,
    })
      .then((res) => {
        if (res.status) {
          const { list, total, current, pageSize } = res.data;
          setPaginationMeta({
            pageSize: pageSize,
            current: current,
            total: total,
          });
          setDataSource(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSearch = (value) => {
    console.log(value);
    getData({ name: value });
  };

  const onPaginationChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  const onShowSizeChange = (current, pageSize) => {
    setPaginationMeta((pre) => ({ ...pre, current, pageSize }));
    getData({ current, pageSize });
  };

  const showDrawer = (bool, record) => {
    setAction(bool);
    setOpen(true);
    setRecord(record);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    formRef?.current?.form
      .validateFields()
      .then(async (values) => {
        values = {
          ...values,
          uid: genAlphabetId(18),
          application_id: Number(appId),
        };
        if (action) {
          const { status, msg } = await comPost(
            `/project/${appId}/form/model/create`,
            values
          );
          if (status) {
            getData();
            setOpen(false);
            message.success(msg);
          }
        } else {
          const { status, msg } = await comPut(
            `/project/${appId}/form/model/update`,
            {
              ...values,
              id: record.id,
            }
          );
          if (status) {
            getData();
            setOpen(false);
            message.success(msg);
          }
        }
      })
      .catch(() => {});
  };

  const onConfirm = async (item) => {
    const res = await comDelete(`/project/${appId}/form/model/delete`, {
      ids: item.id,
      model: item.model,
    });
    if (res.status) {
      getData();
    }
  };

  const onCancel = () => {};

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const formData = [
    {
      label: "表单名称",
      name: "name",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入表单名称",
    },
    {
      label: "数据表名",
      name: "model",
      is: "Input",
      itemSpan: 24,
      placeholder: "请输入数据表名",
    },
    {
      label: "表单描述",
      name: "description",
      is: "Input.TextArea",
      itemSpan: 24,
      placeholder: "请输入表单描述",
    },
    {
      label: "表单分类",
      name: "form_type",
      is: "Select",
      itemSpan: 24,
      placeholder: "请选择表单分类",
      options: [
        {
          label: "后台表单",
          value: "admin",
        },
        {
          label: "web表单",
          value: "web",
        },
        {
          label: "H5表单",
          value: "h5",
        },
        {
          label: "小程序",
          value: "mini",
        },
        {
          label: "移动端",
          value: "app",
        },
      ],
    },
    {
      label: "状态",
      name: "status",
      itemSpan: 24,
      placeholder: "请选择状态",
      is: "Select",
      options: [
        {
          label: "启用",
          value: "1",
        },
        {
          label: "禁用",
          value: "0",
        },
      ],
    },
  ];

  const ENGINE_HOST = import.meta.env.VITE_WIN_ENGINE_HOST;

  const columns = [
    {
      title: "表单名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "标识",
      dataIndex: "page_code",
      key: "page_code",
    },
    {
      title: "表单描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "表单分类",
      dataIndex: "page_type",
      key: "page_type",
      render: (text) => pageTypeEnum[text],
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (
        <span>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</span>
      ),
    },
    {
      title: "修改时间",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => (
        <div>{text ? dayjs(text).format("YYYY-MM-DD  HH:mm:ss") : ""}</div>
      ),
    },
    {
      title: "最近修改人",
      dataIndex: "updated_by_user",
      key: "updated_by_user",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Space>
            <Link
              to={`${ENGINE_HOST}/app/${appId}/form/${record.uid}/design`}
              target="_blank"
            >
              设计
            </Link>
            <Divider type="vertical" />
            <Link
              to={`${ENGINE_HOST}/app/${appId}/form/${record.uid}/runtime`}
              target="_blank"
            >
              运行
            </Link>
            <Divider type="vertical" />
            <Button
              type="text"
              size="small"
              onClick={() => showDrawer(false, record)}
            >
              修改
            </Button>
            <Divider type="vertical" />

            <Popconfirm
              title="系统提醒"
              description="您确定要删除当前表单吗?"
              onConfirm={() => onConfirm(record)}
              onCancel={onCancel}
            >
              <Button type="text" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Flex gap={24} vertical>
      <Space>
        <Button icon={<PlusOutlined />} onClick={() => showDrawer(true)}>
          新建表单
        </Button>
        <Search
          placeholder="搜索表单"
          loading={loading}
          allowClear
          onSearch={onSearch}
        />
      </Space>
      <Table
        dataSource={dataSource}
        loading={loading}
        rowKey={(record) => record.id}
        columns={columns}
        pagination={
          dataSource.length > 0 && {
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
      <Drawer
        width={420}
        title={`${action ? "新增" : "编辑"}表单`}
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

        <Flex vertical gap={24}>
          <Alert
            description="表单标识用于导航中定位和跳转，建议使用有意义的名称，由数字和字母组成"
            type="info"
          ></Alert>

          <Steps
            size="small"
            items={[
              {
                title: "HOST",
                status: "finish",
                description: "https://xxx.com",
                icon: <CloudServerOutlined />,
              },
              {
                title: "APP_ID",
                status: "finish",
                description: "base",
                icon: <FontColorsOutlined />,
              },
              {
                title: "表单标识",
                status: "finish",
                description: "#/8luil",
                icon: <BorderlessTableOutlined />,
              },
            ]}
          />
        </Flex>
      </Drawer>
    </Flex>
  );
};

export default Form;
