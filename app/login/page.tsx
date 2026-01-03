"use client";

import { Button, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleLogin = async () => {
    await login(username, password);
    router.push("/dashboard");
  };

  return (
    <Box mt={20} gap={2} display="flex"
  flexDirection="column">
      <Typography  variant="h4" mb={1}>Admin Login</Typography>
      <TextField fullWidth  label="Username"  onChange={(e) => setUsername(e.target.value)} />
      <TextField fullWidth label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button fullWidth variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}
