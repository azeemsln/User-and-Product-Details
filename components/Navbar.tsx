// "use client";

// import { AppBar, Toolbar, Button } from "@mui/material";
// import Link from "next/link";
// import { useAuthStore } from "@/store/authStore";

// export default function Navbar() {
//   const logout = useAuthStore((s) => s.logout);

//   return (
//     <AppBar position="static" sx={{ mt: 5 }} >
//       <Toolbar sx={{ gap: 5 }}>
//         <Button color="inherit" component={Link} href="/dashboard">Dashboard</Button>
//         <Button color="inherit" component={Link} href="/users">Users</Button>
//         <Button color="inherit" component={Link} href="/products">Products</Button>
//         <Button color="inherit" onClick={logout}>Logout</Button>
//       </Toolbar>
//     </AppBar>
//   );
// }

"use client";

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        mt: 2,
        borderRadius: 2,
        px: 2,
      }}
    >
      <Toolbar>
        {/* Logo / Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button color="inherit" component={Link} href="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} href="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} href="/products">
            Products
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem
            component={Link}
            href="/dashboard"
            onClick={handleMenuClose}
          >
            Dashboard
          </MenuItem>
          <MenuItem component={Link} href="/users" onClick={handleMenuClose}>
            Users
          </MenuItem>
          <MenuItem component={Link} href="/products" onClick={handleMenuClose}>
            Products
          </MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
