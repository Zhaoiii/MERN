import useAuthStore from "@/store/useAuthStore";
import { Box, Typography, Button } from "@mui/material";

export default function Home() {
  const { user } = useAuthStore();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: "text.primary",
        }}
      >
        Welcome {user?.username}
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.05)",
          p: 6,
          width: "100%",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "text.secondary",
          }}
        >
          This is a responsive homepage example built with Material UI
        </Typography>
        {!user && (
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              href="/register"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 5,
                py: 1.75,
                borderRadius: 2,
                fontSize: "1.1rem",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              Register
            </Button>
            <Button
              href="/login"
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                px: 5,
                py: 1.75,
                borderWidth: 2,
                borderRadius: 2,
                fontSize: "1.1rem",
                transition: "all 0.2s",
                "&:hover": {
                  borderWidth: 2,
                  transform: "translateY(-2px)",
                },
              }}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
