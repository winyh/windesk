import { useState, useEffect } from "react";

import {
  CloudUploadOutlined,
  CommentOutlined,
  EllipsisOutlined,
  FireOutlined,
  HeartOutlined,
  PaperClipOutlined,
  PlusOutlined,
  ReadOutlined,
  ShareAltOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import {
  Row,
  Col,
  theme,
  Badge,
  Button,
  Space,
  ConfigProvider,
  Card,
} from "antd";

import {
  Attachments,
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Welcome,
  useXAgent,
  useXChat,
} from "@ant-design/x";
import { createStyles } from "antd-style";
import OpenAI from "openai";

import markdownit from "markdown-it";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import json from "highlight.js/lib/languages/json";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("json", json);

import useStore from "@/store/index";

import winbaseLogo from "/winbase.png";

const renderTitle = (icon, title) => (
  <Space align="start">
    {icon}
    <span>{title}</span>
  </Space>
);
const defaultConversationsItems = [
  {
    key: "0",
    label: "新会话",
  },
];

const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100%;
      min-width: 1000px;
      height: calc(100vh - 300px);
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      .ant-prompts {
        color: ${token.colorText};
      }
    `,
    menu: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
    `,
    conversations: css`
      padding: 0 12px;
      flex: 1;
      overflow-y: auto;
    `,
    chat: css`
      height: 100%;
      width: 100%;
      max-width: 1180px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: ${token.paddingLG}px;
      gap: 16px;
    `,
    messages: css`
      flex: 1;
      background: ${token.colorBgContainer};
    `,
    placeholder: css`
      padding-top: 32px;
    `,
    sender: css`
      box-shadow: ${token.boxShadow};
    `,
    logo: css`
      display: flex;
      height: 72px;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;

      img {
        width: 24px;
        height: 24px;
        display: inline-block;
      }

      span {
        display: inline-block;
        margin: 0 8px;
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    `,
  };
});

const placeholderPromptsItems = [
  {
    key: "1",
    label: renderTitle(
      <FireOutlined
        style={{
          color: "#FF4D4F",
        }}
      />,
      "热门话题"
    ),
    description: "你感兴趣的是什么？",
    children: [
      {
        key: "1-1",
        description: `这个Agent能干嘛?`,
      },
      {
        key: "1-2",
        description: `什么是 AGI?`,
      },
      {
        key: "1-3",
        description: `大模型的文档地址?`,
      },
    ],
  },
  {
    key: "2",
    label: renderTitle(
      <ReadOutlined
        style={{
          color: "#1890FF",
        }}
      />,
      "使用指南"
    ),
    description: "如何使用当前机器人?",
    children: [
      {
        key: "2-1",
        icon: <HeartOutlined />,
        description: `能辅助做哪些事`,
      },
      {
        key: "2-2",
        icon: <SmileOutlined />,
        description: `AI 机器人用途`,
      },
      {
        key: "2-3",
        icon: <CommentOutlined />,
        description: `我不会用`,
      },
    ],
  },
];
const senderPromptsItems = [
  {
    key: "1",
    description: "热门话题",
    icon: (
      <FireOutlined
        style={{
          color: "#FF4D4F",
        }}
      />
    ),
  },
  {
    key: "2",
    description: "使用指南",
    icon: (
      <ReadOutlined
        style={{
          color: "#1890FF",
        }}
      />
    ),
  },
];
const roles = {
  ai: {
    placement: "start",
    typing: {
      step: 5,
      interval: 20,
    },
    styles: {
      content: {
        borderRadius: 16,
      },
    },
    messageRender: (item: string) => {
      // Actual default values
      const md = markdownit({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre><code class="hljs">' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true })
                  .value +
                "</code></pre>"
              );
            } catch (__) {}
          }

          return (
            '<pre><code class="hljs">' +
            md.utils.escapeHtml(str) +
            "</code></pre>"
          );
        },
      });

      const result = md.render(item);

      return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
    },
  },
  local: {
    placement: "end",
    variant: "shadow",
  },
};

const { VITE_AGENT_BASE_URL, VITE_AGENT_API_KEY, BASE_URL } = import.meta.env;

const Agent = () => {
  const antdThemeMode = useStore((state) => state.themeMode);

  // ==================== Style ====================
  const { token } = theme.useToken();
  const { styles } = useStyle(token);

  // ==================== State ====================
  const [headerOpen, setHeaderOpen] = useState(false);
  const [content, setContent] = useState("");
  const [conversationsItems, setConversationsItems] = useState(
    defaultConversationsItems
  );
  const [activeKey, setActiveKey] = useState(defaultConversationsItems[0].key);
  const [attachedFiles, setAttachedFiles] = useState([]);

  // ==================== Openai ====================

  const client = new OpenAI({
    baseURL: VITE_AGENT_BASE_URL,
    apiKey: VITE_AGENT_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // ==================== Runtime ====================
  const [agent] = useXAgent({
    request: async (info, callbacks) => {
      const { messages, message } = info;

      const { onSuccess, onUpdate, onError } = callbacks;

      // current message
      console.log("message", message);

      // history messages
      console.log("messages", messages);

      let content: string = "";

      try {
        const stream = await client.chat.completions.create({
          model: "qwen-plus",
          // if chat context is needed, modify the array
          messages: [{ role: "user", content: message }],
          // stream mode
          stream: true,
        });

        for await (const chunk of stream) {
          content += chunk.choices[0]?.delta?.content || "";

          onUpdate(content);
        }

        onSuccess(content);
      } catch (error) {
        // handle error
        onError();
      }
    },
  });

  const { onRequest, messages, setMessages } = useXChat({
    agent,
  });

  useEffect(() => {
    if (activeKey !== undefined) {
      let linkTarget = document.getElementById("hljs");
      let github = "github"; // 这里设置没生效-github-dark可以设置深色
      if (antdThemeMode === "dark") {
        github = "github-dark";
      }

      if (linkTarget) {
        document.head.removeChild(linkTarget);
      }

      const linkElement = document.createElement("link");
      linkElement.id = "hljs";
      linkElement.rel = "stylesheet";
      linkElement.href = `${BASE_URL}css/${github}.min.css`;
      document.head.appendChild(linkElement);

      hljs.highlightAll();
      setMessages([]);
    }
  }, [activeKey]);

  // ==================== Event ====================
  const onSubmit = (nextContent) => {
    if (!nextContent) return;
    onRequest(nextContent);
    setContent("");
  };

  const onPromptsItemClick = (info) => {
    onRequest(info.data.description);
  };

  const onAddConversation = () => {
    setConversationsItems([
      ...conversationsItems,
      {
        key: `${conversationsItems.length}`,
        label: `新会话 ${conversationsItems.length}`,
      },
    ]);
    setActiveKey(`${conversationsItems.length}`);
  };

  const onConversationClick = (key) => {
    setActiveKey(key);
  };

  const handleFileChange = (info) => setAttachedFiles(info.fileList);

  // ==================== Nodes ====================
  const placeholderNode = (
    <Space direction="vertical" size={16} className={styles.placeholder}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <Welcome
          style={{
            backgroundImage: "linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)",
            borderStartStartRadius: 4,
            minWidth: 680,
          }}
          icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
          title="你好, 我是 winbase"
          description="基于通义千问大模型机器人"
        />
      </ConfigProvider>

      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <Prompts
          title="你想问?"
          items={placeholderPromptsItems}
          styles={{
            title: {
              color:
                antdThemeMode === "dark"
                  ? token.colorWhite
                  : token.colorBgSpotlight,
            },
            list: {
              width: "100%",
            },
            item: {
              flex: "none",
              width: "calc(30% - 6px)",
              backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
              border: 0,
            },
            subItem: {
              background: "rgba(255,255,255,0.45)",
              border: "1px solid #FFF",
              color:
                antdThemeMode === "dark"
                  ? token.colorBgBase
                  : token.colorBgSpotlight,
            },
          }}
          onItemClick={onPromptsItemClick}
        />
      </ConfigProvider>
    </Space>
  );
  const items = messages.map(({ id, message, status }) => ({
    key: id,
    loading: status === "loading",
    role: status === "local" ? "local" : "ai",
    content: message,
    variant: antdThemeMode === "dark" ? "shadow" : "filled",
    shape: "corner",
    styles: {
      content: {
        background:
          antdThemeMode === "dark"
            ? token.colorInfoActive
            : token.colorBorderSecondary,
      },
    },
  }));
  const attachmentsNode = (
    <Badge dot={attachedFiles.length > 0 && !headerOpen}>
      <Button
        type="text"
        icon={<PaperClipOutlined />}
        onClick={() => setHeaderOpen(!headerOpen)}
      />
    </Badge>
  );
  const senderHeader = (
    <Sender.Header
      title="附件"
      open={headerOpen}
      onOpenChange={setHeaderOpen}
      styles={{
        content: {
          padding: 0,
          backgroundImage: "linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)",
        },
      }}
    >
      <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={handleFileChange}
        placeholder={(type) =>
          type === "drop"
            ? {
                title: "将文件拖拽到这里",
              }
            : {
                icon: <CloudUploadOutlined />,
                title: "上传文件",
                description: "点击或拖拽文件到此区域以上传",
              }
        }
      />
    </Sender.Header>
  );
  const logoNode = (
    <div className={styles.logo}>
      <img src={winbaseLogo} draggable={false} alt="logo" />
      <span>winbase</span>
    </div>
  );

  // ==================== Render =================
  return (
    <div className={styles.layout}>
      <div className={styles.menu}>
        {/* 🌟 Logo */}
        {logoNode}
        {/* 🌟 添加会话 */}
        <Button
          onClick={onAddConversation}
          type="link"
          className={styles.addBtn}
          icon={<PlusOutlined />}
          style={{ borderRadius: 6 }}
        >
          开启新对话
        </Button>
        {/* 🌟 会话管理 */}
        <Conversations
          items={conversationsItems}
          className={styles.conversations}
          activeKey={activeKey}
          styles={{
            item: {
              backgroundImage:
                "linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)",
              borderRadius: "6px",
              border: "1px solid #eee",
            },
          }}
          onActiveChange={onConversationClick}
        />
      </div>
      <div className={styles.chat}>
        {/* 🌟 消息列表 */}
        <Bubble.List
          items={
            items.length > 0
              ? items
              : [
                  {
                    content: placeholderNode,
                    variant: antdThemeMode === "dark" ? "shadow" : "borderless",
                    shape: "corner",
                  },
                ]
          }
          roles={roles}
          className={styles.messages}
        />
        {/* 🌟 提示词 */}
        <Prompts
          styles={{
            item: {
              backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
              color:
                antdThemeMode === "dark"
                  ? token.colorBgBase
                  : token.colorBgSpotlight,
            },
          }}
          items={senderPromptsItems}
          onItemClick={onPromptsItemClick}
        />
        {/* 🌟 输入框 */}
        <Sender
          value={content}
          allowSpeech
          header={senderHeader}
          onSubmit={onSubmit}
          onChange={setContent}
          prefix={attachmentsNode}
          loading={agent.isRequesting()}
          className={styles.sender}
          styles={{
            input: {
              color:
                antdThemeMode === "dark"
                  ? token.colorWhite
                  : token.colorBgSpotlight,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Agent;
