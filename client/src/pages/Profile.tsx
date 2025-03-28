import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Container } from "@mui/material";
import { request } from "../utils/request";

type User = {
  id: string;
  username: string;
  email: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await request.get<User>("/user/profile");
        if (!response.data?.data) new Error("Failed to fetch profile");
        setUser(response.data.data!);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Information
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              username: {user.username}
            </Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
