"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TableContainer,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function UsersPage() {
  const { users, fetchUsers, searchUsers } = useUserStore();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      await fetchUsers(10, 0);
      setLoading(false);
    };

    loadUsers();
  }, []);

  return (
    <ProtectedRoute>
      <Navbar />

      <Box sx={{ mt: 4 }}>
        {/* Search Box */}
        <TextField
          fullWidth
          label="Search Users"
          variant="outlined"
          sx={{ mb: 3, maxWidth: 400 }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchUsers(e.target.value);
          }}
        />

        {/* 🔄 Loading State */}
        {loading ? (
          <Paper
            sx={{
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            <CircularProgress />
          </Paper>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((u) => (
                  <TableRow
                    key={u.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  >
                    <TableCell>
                      <Link
                        href={`/users/${u.id}`}
                        style={{
                          textDecoration: "none",
                          color: "#1976d2",
                          fontWeight: 500,
                        }}
                      >
                        {u.firstName}
                      </Link>
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.company?.name || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </ProtectedRoute>
  );
}
