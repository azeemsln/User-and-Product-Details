"use client";

import { api } from "@/lib/api";
import { use, useEffect, useState } from "react";
import { Typography, Button, Box, Paper, Avatar, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { User } from "../../../Type/user";

export default function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { id } = use(params);
  useEffect(() => {
    api.get(`/users/${id}`).then((res) => setUser(res.data));
  }, []);

  if (!user) return null;

  return (
    <>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, px: 2 }}>
        {/* Header */}
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            mb: 4,
            textAlign: "center",
            boxShadow: 3,
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "#fff",
          }}
        >
          <Avatar
            src={user.image}
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 2,
              border: "4px solid #fff",
            }}
          />
          <Typography variant="h4" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>
            @{user.username} • {user.role}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {user.email}
          </Typography>
        </Paper>

        <Stack spacing={4}>
          {/* Personal Info */}
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" mb={2}>
              👤 Personal Information
            </Typography>
            <Stack spacing={1}>
              <Typography>Age: {user.age}</Typography>
              <Typography>Gender: {user.gender}</Typography>
              <Typography>Birth Date: {user.birthDate}</Typography>
              <Typography>Blood Group: {user.bloodGroup}</Typography>
              <Typography>Height: {user.height} cm</Typography>
              <Typography>Weight: {user.weight} kg</Typography>
              <Typography>Eye Color: {user.eyeColor}</Typography>
              <Typography>
                Hair: {user.hair.color} ({user.hair.type})
              </Typography>
            </Stack>
          </Paper>

          {/* Contact Info */}
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" mb={2}>
              📞 Contact Information
            </Typography>
            <Stack spacing={1}>
              <Typography>Email: {user.email}</Typography>
              <Typography>Phone: {user.phone}</Typography>
              <Typography>IP Address: {user.ip}</Typography>
              <Typography>MAC: {user.macAddress}</Typography>
            </Stack>
          </Paper>

          {/* Address */}
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" mb={2}>
              🏠 Address
            </Typography>
            <Stack spacing={1}>
              <Typography>{user.address.address}</Typography>
              <Typography>
                {user.address.city}, {user.address.state} (
                {user.address.stateCode})
              </Typography>
              <Typography>{user.address.country}</Typography>
              <Typography>Postal Code: {user.address.postalCode}</Typography>
            </Stack>
          </Paper>

          {/* Company */}
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" mb={2}>
              💼 Company
            </Typography>
            <Stack spacing={1}>
              <Typography>Name: {user.company.name}</Typography>
              <Typography>Department: {user.company.department}</Typography>
              <Typography>Title: {user.company.title}</Typography>
              <Typography>
                Location: {user.company.address.city},{" "}
                {user.company.address.country}
              </Typography>
            </Stack>
          </Paper>

          {/* Bank */}
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" mb={2}>
              💳 Bank Details
            </Typography>
            <Stack spacing={1}>
              <Typography>Card Type: {user.bank.cardType}</Typography>
              <Typography>Currency: {user.bank.currency}</Typography>
              <Typography>IBAN: {user.bank.iban}</Typography>
              <Typography>Expires: {user.bank.cardExpire}</Typography>
            </Stack>
          </Paper>

          {/* Crypto */}
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" mb={2}>
              🪙 Crypto Wallet
            </Typography>
            <Stack spacing={1}>
              <Typography>Coin: {user.crypto.coin}</Typography>
              <Typography>Network: {user.crypto.network}</Typography>
              <Typography sx={{ wordBreak: "break-all" }}>
                Wallet: {user.crypto.wallet}
              </Typography>
            </Stack>
          </Paper>
        </Stack>

        {/* Back Button */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.back()}
            sx={{ px: 4, py: 1.5, fontWeight: "bold" }}
          >
            Back
          </Button>
        </Box>
      </Box>
    </>
  );
}
