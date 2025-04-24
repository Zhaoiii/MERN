import useAuthStore from "@/store/useAuthStore";
import { Typography, Button, Card, Space, Layout } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LoginOutlined, FormOutlined } from "@ant-design/icons";

const { Content } = Layout;

export default function Home() {
  const { user } = useAuthStore();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 20px",
          background: "#f0f2f5",
        }}
      >
        <Card style={{ width: "100%", maxWidth: 500, textAlign: "center" }}>
          <Typography.Title level={2}>
            欢迎{user?.username ? ` ${user.username}` : "来到我们的平台"}
          </Typography.Title>

          <Typography.Paragraph
            style={{ fontSize: "16px", marginBottom: "24px" }}
          >
            这是一个使用MERN技术栈和Ant Design构建的现代化Web应用
          </Typography.Paragraph>

          {!user && (
            <Space size="middle" style={{ marginTop: "24px" }}>
              <Link to="/register">
                <Button type="primary" icon={<FormOutlined />} size="large">
                  注册
                </Button>
              </Link>
              <Link to="/login">
                <Button icon={<LoginOutlined />} size="large">
                  登录
                </Button>
              </Link>
            </Space>
          )}

          {user && (
            <Link to="/profile">
              <Button type="primary" icon={<UserOutlined />} size="large">
                个人中心
              </Button>
            </Link>
          )}
        </Card>
      </Content>
    </Layout>
  );
}
