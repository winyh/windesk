import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};
const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  height: "100%",
};

const LayoutBase = () => {
  return (
    <Layout style={layoutStyle}>
      <Sider width="25%" style={siderStyle}>
        Sider
      </Sider>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutBase;
