import { useState, useRef, useEffect } from "react";
import { Input, Tabs, Row, Col, Spin, Flex, Modal } from "antd";
import * as antdIcons from "@ant-design/icons";
import copy from "copy-to-clipboard";
import "./index.css";

import { message } from "@/store/hooks";

import { IconFont } from "../IconFont";

const { Search } = Input;

const {
  createFromIconfontCN,
  setTwoToneColor,
  getTwoToneColor,
  IconProvider,
  ...restIcons
} = antdIcons;

delete restIcons.default; // 删除无效对象

const IconSelect = ({ onChange, value, id }) => {
  const [icon, setIcon] = useState("");
  const [activeKey, setActiveKey] = useState("antd");
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [icons, setIcons] = useState([]);

  const onIconChange = (changeValue) => {
    setIcon(changeValue);
    onChange && onChange(changeValue);
  };

  const onCopy = (icon) => {
    copy(`<${icon} />`);
    setIcon(icon);
    onChange && onChange(icon);
    message.success(`已选中 <${icon} /> 成功`);
  };

  const items = [
    {
      key: "antd",
      label: "内置图标",
      children: load ? (
        <div className="icon-content">
          <Row gutter={[16, 16]}>
            {icons.map((icon, index) => (
              <Col span={2} onClick={() => onCopy(icon)} key={icon + index}>
                <div className="icon-card">
                  <IconFont type={icon} style={{ fontSize: 24 }} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <Spin spinning>
          <div className="icon-content-blank"></div>
        </Spin>
      ),
    },
    {
      key: "third",
      label: "三方图标",
      children: "三方图标",
    },
    {
      key: "custom",
      label: "自定义图标",
      children: "自定义图标",
    },
  ];

  const onTabChange = (value) => {
    setActiveKey(value);
  };

  const handleSearch = (value) => {
    const filterIocns = Object.keys(restIcons).filter((icon) =>
      icon.toLowerCase().includes(value.toLowerCase())
    );

    setIcons(filterIocns);
  };

  const onClick = () => {
    setOpen(true);
    setIcons([]);
    setLoad(false);

    setTimeout(() => {
      setIcons(Object.keys(restIcons));
      setLoad(true);
    }, 100);
  };

  return (
    <div>
      <Input
        id={id}
        readOnly
        value={value || icon}
        onChange={onIconChange}
        onClick={onClick}
        addonBefore={
          icon ? (
            <IconFont type={icon || value} />
          ) : (
            <IconFont type="QuestionCircleOutlined" />
          )
        }
        placeholder="请选择图标"
      />
      <Modal
        title="请选择图标"
        width="40%"
        open={open}
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          setOpen(false);
        }}
      >
        <Flex gap={8} vertical>
          <IconFont
            style={{ height: 24, width: 24 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          ></IconFont>
          <Search allowClear onSearch={handleSearch} placeholder="搜索图标" />
          <Tabs
            defaultActiveKey={activeKey}
            activeKey={activeKey}
            items={items}
            onChange={onTabChange}
          />
        </Flex>
      </Modal>
    </div>
  );
};

export { IconSelect };
export default IconSelect;
