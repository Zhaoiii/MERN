import { Layout } from "antd";
import { ReactNode } from "react";

const { Content } = Layout;

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <Content
      style={{
        padding: "24px",
        minHeight: "calc(100vh - 64px)",
        background: "#f5f5f5",
      }}
    >
      {children}
    </Content>
  );
};

export default Container;
