"use client";

import { api } from "@/lib/api";
import { use, useEffect, useState } from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { Product } from "@/Type/products";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { id } = use(params);
  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, []);

  if (!product) return null;

  return (
    <>
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          mt: 6,
          px: 2,
        }}
      >
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            boxShadow: 4,
            textAlign: "center",
          }}
        >
          {/* Product Image */}
          {product.images && (
            <Box
              component="img"
              src={product.images}
              alt={product.title}
              sx={{
                width: "100%",
                maxHeight: 350,
                objectFit: "contain",
                mb: 3,
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          )}

          {/* Product Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 2, color: "#1976d2" }}
          >
            {product.title}
          </Typography>

          {/* Product Description */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.6 }}
          >
            {product.description}
          </Typography>

          {/* Product Price */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3, color: "#388e3c" }}
          >
            ₹{product.price}
          </Typography>

          {/* Back Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.back()}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            Back
          </Button>
        </Paper>
      </Box>
    </>
  );
}
