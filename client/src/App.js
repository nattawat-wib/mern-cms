import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddArticle from './article/add-article';
import AllArticle from './article/all-article';
import DetailArticle from "./article/detail-article";
import EditArticle from "./article/edit-article";

const main_theme = createTheme({
    palette: {
        primary: {
            main: "#64B5F6",
            contrastText: "#E3F2FD"
        },
        secondary: {
            main: "#ffafcc",
        },
        gray: {
            "50": "#E3F2FD"
        }
    }
})

function App() {
    return (
        <ThemeProvider theme={main_theme}>
            <BrowserRouter>
                <Navbar />
                <main className="p-4">
                    <Routes>
                        <Route index path="/" element={<AllArticle />} />
                        <Route path="/article" element={<AllArticle />} />
                        <Route path="/article/:url" element={<DetailArticle />} />
                        <Route path="/article/add" element={<AddArticle />} />
                        <Route path="/article/edit/:url" element={<EditArticle />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
