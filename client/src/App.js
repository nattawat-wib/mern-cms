import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";

import { main_theme } from "./style/theme";

import Navbar from './components/Navbar';
import AddArticle from './article/add-article';
import AllArticle from './article/all-article';
import DetailArticle from "./article/detail-article";
import EditArticle from "./article/edit-article";

console.log(main_theme);

function App() {
    return (
        <StyledEngineProvider injectFirst>
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
        </StyledEngineProvider>
    );
}

export default App;
