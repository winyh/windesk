import React from "react";
import { Tabs } from "antd";

const Navigation = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const tabItems = [
    {
      label: "PC 导航",
      key: "pc",
      children: <div>参考菜单管理 http://localhost:1420/authority/menu</div>,
    },
    {
      label: "H5 导航",
      key: "mobile",
      children: <div>22</div>,
    },
    {
      label: "App 导航",
      key: "app",
      children: <div>22</div>,
    },
    {
      label: "Mini 导航",
      key: "mini",
      children: <div>22</div>,
    },
    {
      label: "底部导航",
      key: "bottom",
      children: <div>22</div>,
    },
  ];

  return (
    <div>
      <Tabs onChange={onChange} type="card" items={tabItems} />
    </div>
  );
};

export default Navigation;
