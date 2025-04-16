import { Container, Box, Typography, TextField, Button } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import useAuthStore from "@/store/useAuthStore";

export default function Login() {
  const store = useAuthStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(store);
    const data = new FormData(event.currentTarget);

    try {
      await store.login({
        username: data.get("username") as string,
        password: data.get("password") as string,
      });
      window.location.href = "/user";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 6,
          borderRadius: 4,
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.05)",
          bgcolor: "background.paper",
          width: "100%",
          // maxWidth: 500,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          <LockOpenIcon sx={{ verticalAlign: "bottom", mr: 1 }} />
          User Login
        </Typography>

        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <TextField
              name="username"
              type="username"
              fullWidth
              required
              margin="normal"
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <TextField
              name="password"
              type="password"
              fullWidth
              required
              margin="normal"
              placeholder="Enter password"
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Login Now
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 4, textAlign: "center" }}>
          Don't have an account?
          <Button
            href="/register"
            color="primary"
            variant="text"
            size="small"
            sx={{ ml: 1 }}
          >
            Register Now
          </Button>
        </Typography>
      </Box>
    </Container>
  );
}
