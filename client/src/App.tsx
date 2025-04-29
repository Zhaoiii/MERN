import { useRoutes } from "react-router-dom";
import { ConfigProvider } from "antd";
import Header from "./layout/Header";
import appRoutes from "./routes";
import Container from "./layout/Container";
import { Suspense } from "react";

function App() {
  const RenderRoutes = useRoutes(appRoutes);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 6,
        },
      }}
    >
      <Header />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>{RenderRoutes}</Suspense>
      </Container>
    </ConfigProvider>
  );
}

export default App;
