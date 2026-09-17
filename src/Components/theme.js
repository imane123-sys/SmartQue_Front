import { createTheme } from "@mui/material/styles";

export const colors = {
  primary: "#4338D8",
  primaryDark: "#3428C5",

  purpleSection: "#4337D4",

  text: "#17152F",
  textLight: "#77768A",

  background: "#FFFFFF",
  backgroundSoft: "#F7F6FC",

  lilac: "#EFEDFF",

  border: "#E9E8F1",

  green: "#20B77A",
};

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
    },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },

    text: {
      primary: colors.text,
      secondary: colors.textLight,
    },
  },

  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',

    // IMPORTANT POUR ÉVITER fontWeightBold undefined
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontWeight: 800,
      letterSpacing: "-0.05em",
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
          textTransform: "none",
          boxShadow: "none",
        },

        contained: {
          boxShadow: "none",

          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;
