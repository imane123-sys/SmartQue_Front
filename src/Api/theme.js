import { createTheme } from "@mui/material/styles";

export const colors = {
  primary: "#4338D8",
  primaryDark: "#3428C5",

  purpleSection: "#4337D4",

  text: "#17152F",
  textLight: "#79788C",

  background: "#FFFFFF",
  backgroundSoft: "#F7F6FC",

  lilac: "#EFEDFF",

  border: "#E9E8F1",

  green: "#22B879",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    background: {
      default: "#FFFFFF",
    },
  },

  typography: {
    fontFamily:
      '"Inter", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',

    h1: {
      fontWeight: 800,
      letterSpacing: "-0.045em",
    },

    h2: {
      fontWeight: 800,
      letterSpacing: "-0.04em",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
        },

        contained: {
          boxShadow: "none",

          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },

        body: {
          margin: 0,
          backgroundColor: "#FFFFFF",
          color: colors.text,
        },

        "*": {
          boxSizing: "border-box",
        },

        a: {
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
