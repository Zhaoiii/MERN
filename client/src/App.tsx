import { useRoutes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import appRoutes from "./routes";
import { Suspense } from "react";
import AuthGuard from "./components/AuthGuard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  const RenderRoutes = useRoutes(appRoutes);
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard>{RenderRoutes}</AuthGuard>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
