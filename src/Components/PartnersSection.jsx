import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import {
  Favorite,
  LocalShipping,
  AccountBalance,
  LocalHospital,
  DirectionsSubway,
  AutoAwesome,
} from "@mui/icons-material";

export const PartnersSection = () => (
  <Box
    component="section"
    sx={{
      py: 5,
      borderTop: "1px solid #f1f5f9",
      borderBottom: "1px solid #f1f5f9",
      bgcolor: "rgba(248, 250, 252, 0.5)",
    }}
  >
    <Container maxWidth="lg" sx={{ maxWidth: "1280px !important", px: 3 }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#94a3b8",
          mb: 4,
        }}
      >
        Proud Queue Management Partners With
      </Typography>

      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{
          opacity: 0.6,
          filter: "grayscale(100%)",
          transition: "all 0.3s",
          "&:hover": { filter: "grayscale(0%)", opacity: 1 },
        }}
      >
        {[
          {
            icon: <Favorite sx={{ width: 20, height: 20, color: "#ef4444" }} />,
            name: (
              <>
                Google
                <Box
                  component="span"
                  sx={{ color: "#94a3b8", fontWeight: 400 }}
                >
                  Health
                </Box>
              </>
            ),
          },
          {
            icon: (
              <LocalShipping sx={{ width: 20, height: 20, color: "#f59e0b" }} />
            ),
            name: (
              <>
                amazon
                <Box
                  component="span"
                  sx={{ color: "#0e8bf1", fontWeight: 600 }}
                >
                  care
                </Box>
              </>
            ),
          },
          {
            icon: (
              <AccountBalance
                sx={{ width: 20, height: 20, color: "#e11d48" }}
              />
            ),
            name: "Santander",
          },
          {
            icon: (
              <LocalHospital sx={{ width: 20, height: 20, color: "#2563eb" }} />
            ),
            name: (
              <>
                City
                <Box component="span" sx={{ color: "#006adc" }}>
                  Clinic
                </Box>
              </>
            ),
          },
          {
            icon: (
              <DirectionsSubway
                sx={{ width: 20, height: 20, color: "#9333ea" }}
              />
            ),
            name: (
              <>
                Metro
                <Box
                  component="span"
                  sx={{ color: "#94a3b8", fontWeight: 300 }}
                >
                  Transit
                </Box>
              </>
            ),
          },
          {
            icon: (
              <AutoAwesome sx={{ width: 20, height: 20, color: "#06b6d4" }} />
            ),
            name: "NOXIS",
          },
        ].map((partner, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "#334155",
              }}
            >
              {partner.icon}
              <span>{partner.name}</span>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);
