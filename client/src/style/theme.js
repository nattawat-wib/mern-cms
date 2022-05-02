import { createTheme } from "@mui/material";

export const main_theme = createTheme({
    palette: {
        primary: {
            main: "#64B5F6",
            light: "#ffafcc",
            contrastText: "#fff",
        },
        secondary: {
            main: "#ffafcc",
            light: "green"
        },
        gray: {
            "50": "#E3F2FD"
        },
        light: {
            main: "#fff"
        },
        background: {
            default: "#E3F2FD",
        }
    }
})