import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";
const Result500 = () => {
  const navigate = useNavigate();
  const { BASE_URL } = import.meta.env;
  const goHome = () => {
    navigate(`${BASE_URL}saas`);
  };
  return (
    <Result
      status="500"
      title="500"
      subTitle="对不起, 当前服务器异常."
      extra={
        <Button type="primary" onClick={goHome}>
          返回首页
        </Button>
      }
    />
  );
};
export default Result500;
