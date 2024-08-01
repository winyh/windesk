import React, { useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Flex, Pagination, Space } from "antd";

const actions = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const Application = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <Flex justify="space-between" vertical style={{ height: "100%" }}>
      <Flex gap="middle" align="start" wrap>
        <Card
          title="应用A"
          loading={loading}
          actions={actions}
          style={{
            minWidth: 300,
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            }
            description={
              <>
                <p>This is the description</p>
                <p>This is the description</p>
              </>
            }
          />
        </Card>
        <Card
          title="应用B"
          loading={loading}
          actions={actions}
          style={{
            minWidth: 300,
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            }
            description={
              <>
                <p>This is the description</p>
                <p>This is the description</p>
              </>
            }
          />
        </Card>
        <Card
          title="应用B"
          loading={loading}
          actions={actions}
          style={{
            minWidth: 300,
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            }
            description={
              <>
                <p>This is the description</p>
                <p>This is the description</p>
              </>
            }
          />
        </Card>
        <Card
          title="应用B"
          loading={loading}
          actions={actions}
          style={{
            minWidth: 300,
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            }
            description={
              <>
                <p>This is the description</p>
                <p>This is the description</p>
              </>
            }
          />
        </Card>
        <Card
          title="应用B"
          loading={loading}
          actions={actions}
          style={{
            minWidth: 300,
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            }
            description={
              <>
                <p>This is the description</p>
                <p>This is the description</p>
              </>
            }
          />
        </Card>
        <Card
          title="应用B"
          loading={loading}
          actions={actions}
          style={{
            minWidth: 300,
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            }
            description={
              <>
                <p>This is the description</p>
                <p>This is the description</p>
              </>
            }
          />
        </Card>
      </Flex>

      <Flex justify="center">
        <Pagination
          showQuickJumper
          defaultCurrent={2}
          total={500}
          onChange={onChange}
        />
      </Flex>
    </Flex>
  );
};

export default Application;
