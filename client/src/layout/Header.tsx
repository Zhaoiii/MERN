import { Layout, Menu, Button, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AntHeader style={{ background: "#fff", padding: "0 24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: "20px" }}>MERN App</h1>
        </Link>
        <Space>
          {user ? (
            <>
              <Button type="link" icon={<UserOutlined />}>
                <Link to="/user">{user.username}</Link>
              </Button>
              <Button
                type="link"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button type="link" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Button>
              <Button type="primary">
                <Link to="/register" style={{ color: "inherit" }}>
                  Register
                </Link>
              </Button>
            </>
          )}
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
