import { useRoutes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./layout/Header";
import appRoutes from "./routes";
import Container from "./layout/Container";
import { Suspense } from "react";

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
      <Header />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>{RenderRoutes}</Suspense>
      </Container>
    </ThemeProvider>
  );
}

export default App;
