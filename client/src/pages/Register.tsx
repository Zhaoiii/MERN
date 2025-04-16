import { Container, Box, Typography, TextField, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { authService } from "@/services/auth";

export default function Register() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await authService.register({
      username: data.get("username") as string,
      email: data.get("email") as string,
      password: password,
    });
    window.location.href = "/login";
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
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          <PersonAddIcon sx={{ verticalAlign: "bottom", mr: 1 }} />
          User Registration
        </Typography>

        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <TextField
              name="username"
              type="text"
              fullWidth
              required
              margin="normal"
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <TextField
              name="email"
              type="email"
              fullWidth
              required
              margin="normal"
              placeholder="Enter email address"
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <TextField
              name="confirmPassword"
              type="password"
              fullWidth
              required
              margin="normal"
              placeholder="Confirm your password"
            />
          </div>

          <Button type="submit" variant="contained" size="large">
            Register Now
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 4, textAlign: "center" }}>
          Already have an account?
          <Button
            href="/login"
            color="primary"
            variant="text"
            size="small"
            sx={{ ml: 1 }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
}
