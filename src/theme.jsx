import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    mode: "light",
    black: { primary: "#000000", secondary: "#333333" },
    white: { primary: "#F7F7F7", secondary: "#F4F4F4" },
    blue: { main: "#1976D2",tealblue:"#157ba1", contrastText: "#FFFFFF" },
    secondary: { main: "#FF9800", contrastText: "#000000" },
    sidebar: { background: "#E9EFEC", text: "#000000", link: "#333333", hover: "#1976D2" },
    success: { main: "#4CAF50", contrastText: "#FFFFFF" },
    error: { main: "#F44336", contrastText: "#FFFFFF" },
    warning: { main: "#FFC107", contrastText: "#000000" },
    info: { main: "#2196F3", contrastText: "#FFFFFF" },
    grey: { light: "#E0E0E0", dark: "#616161" },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: "#ffffff", color: "#333333", boxShadow: "none" },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    black: { primary: "#FFFFFF", secondary: "#B0B0B0" },
    white: { primary: "#121212", secondary: "#1E1E1E" },
    primary: { main: "#90CAF9", contrastText: "#000000" },
    secondary: { main: "#FFB74D", contrastText: "#000000" },
    sidebar: { background: "#1E1E1E", text: "#FFFFFF", link: "#B0B0B0", hover: "#90CAF9" },
    success: { main: "#4CAF50", contrastText: "#FFFFFF" },
    error: { main: "#F44336", contrastText: "#FFFFFF" },
    warning: { main: "#FFC107", contrastText: "#000000" },
    info: { main: "#2196F3", contrastText: "#FFFFFF" },
    grey: { light: "#E0E0E0", dark: "#616161" },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: "#121212", color: "#FFFFFF", boxShadow: "none" },
      },
    },
  },
});

export const getTheme = (mode) => (mode === "dark" ? darkTheme : Theme);

export default Theme; // for initial load
