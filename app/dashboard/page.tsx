"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Navbar />
      <Typography variant="h5" align="center" mt={4} fontWeight="bold">
        Welcome to Admin Dashboard
      </Typography>
    </ProtectedRoute>
  );
}
