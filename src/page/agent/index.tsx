import { useState } from "react";
import { ProChat } from "@ant-design/pro-chat";
import { Row, Col, theme } from "antd";

const example = {
  chats: [
    {
      content: "昨天的当天是明天的什么？",
      createAt: 1697862242452,
      id: "ZGxiX2p4",
      role: "user",
      updateAt: 1697862243540,
      extra: {
        test: "Test Extra",
      },
    },
    {
      content: "昨天的当天是明天的昨天。",
      createAt: 1697862247302,
      id: "Sb5pAzLL",
      parentId: "ZGxiX2p4",
      role: "assistant",
      updateAt: 1697862249387,
      model: "gpt-3.5-turbo",
    },
  ],
  config: {
    model: "gpt-3.5-turbo",
    params: {
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 0.6,
      top_p: 1,
    },
    systemRole: "",
  },
};

const Agent = () => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <div style={{ height: "100%" }}>
      <Row gutter={36} style={{ height: "100%" }}>
        <Col span={4}>左侧配置</Col>
        <Col span={16} style={{ background: colorBgLayout, height: "100%" }}>
          <ProChat
            loading={loading}
            request={async (messages) => {
              const response = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({ messages: messages }),
              });
              const data = await response.json();
              return new Response(data.output?.text);
            }}
            config={{
              ...example.config,
              params: {
                ...example.config.params,
                userId: "123",
                extra: "extra",
              },
            }}
            autocompleteRequest={async (value) => {
              if (value === "/") {
                return [
                  {
                    value: "你可以帮助我列出问题吗？",
                    label: "你可以帮助我列出问题吗？",
                  },
                ];
              }
              return [];
            }}
            inputAreaProps={{
              autoCompleteProps: {
                placement: "topRight",
              },
            }}
            userMeta={{
              extra: "extra",
            }}
            messageItemExtraRender={(_, type) => {
              if (type === "user") return <span>🦐</span>;
              return <span>👍</span>;
            }}
            placeholder="输入 / 查看推荐问题，或者直接输入你的问题"
            onResetMessage={async () => {
              console.log("数据清空");
            }}
          />
        </Col>
        <Col span={4}>右侧配置</Col>
      </Row>
    </div>
  );
};

export default Agent;
