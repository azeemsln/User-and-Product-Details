"use client";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <div className="flex items-center gap-4">
        <Typography variant="h4">For Login Page:</Typography>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/login");
          }}
        >
          Go to Login Page
        </Button>
      </div>
    </div>
  );
}
