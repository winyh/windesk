import { useState } from "react";
import { Button, Table } from "antd";

const ApiKey = () => {
  const [keyList, setKeyList] = useState([]);
  return (
    <div>
      <div>分为租户KEY可以通过接口管理整个后台-应用KEY 可以管理单个应用</div>
      <Button>创建KEY</Button> Token Name Created Status
      <Table />
    </div>
  );
};

export default ApiKey;
