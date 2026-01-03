"use client";

import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "@/store/productStore";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Paper,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProductsPage() {
  const { products, fetchProducts } = useProductStore();
  const [search, setSearch] = useState(""); // Search term
  const [category, setCategory] = useState(""); // Selected category
  const [page, setPage] = useState(1); // Current page
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 9; // Number of products per page

  useEffect(() => {
  const loadProducts = async () => {
    setLoading(true);
    await fetchProducts(50, 0);
    setLoading(false);
  };

  loadProducts();
}, []);


  // Get unique categories from products
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter products by search and category
  const filteredProducts = useMemo(
    () =>
      products.filter((p) => {
        const matchesSearch = p.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory = category ? p.category === category : true;
        return matchesSearch && matchesCategory;
      }),
    [products, search, category]
  );

  // Pagination: calculate visible products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, page]);

  return (
    <ProtectedRoute>
      <Navbar />

      {/* Search & Category Filters */}
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        {/* Search Bar */}
        <TextField
          fullWidth
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page on search
          }}
        />

        {/* Category Dropdown */}
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1); // reset page on filter
            }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Loading State */}
{loading ? (
  <Paper
    sx={{
      height: 400,
      mt: 4,
      mx: "auto",
      maxWidth: 1200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    }}
  >
    <CircularProgress size={50} />
  </Paper>
) : (
  <>
    {/* Product Cards */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
        mt: 4,
      }}
    >
      {paginatedProducts.map((p) => (
        <Card
          key={p.id}
          sx={{
            width: { xs: "100%", sm: 250, md: 280 },
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 6,
            },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {p.images && (
            <Box
              component="img"
              src={p.images?.[0]}
              alt={p.title}
              sx={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            />
          )}

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              mb={1}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <Link
                href={`/products/${p.id}`}
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                {p.title}
              </Link>
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              ₹{p.price}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {p.category}
            </Typography>

            {p.rating && (
              <Typography variant="body2" color="text.secondary">
                ⭐ {p.rating} / 5
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}

      {paginatedProducts.length === 0 && (
        <Typography sx={{ mt: 4, width: "100%", textAlign: "center" }}>
          No products found.
        </Typography>
      )}
    </Box>

    {/* Pagination */}
    {totalPages > 1 && (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 6 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    )}
  </>
)}
    </ProtectedRoute>
  );
}
