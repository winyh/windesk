import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";
const Result404 = () => {
  const navigate = useNavigate();
  const { BASE_URL } = import.meta.env;
  const goHome = () => {
    navigate(`${BASE_URL}saas`);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起, 您访问的页面不存在."
      extra={
        <Button type="primary" onClick={goHome}>
          返回首页
        </Button>
      }
    />
  );
};
export default Result404;
