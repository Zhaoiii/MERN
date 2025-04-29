import { useRoutes } from "react-router-dom";
import { ConfigProvider } from "antd";
import appRoutes from "./routes/index";
import { Suspense } from "react";
import RouteGuard from "./components/RouteGuard";

function App() {
  const routes = useRoutes(appRoutes);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 6,
        },
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <RouteGuard>{routes}</RouteGuard>
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
