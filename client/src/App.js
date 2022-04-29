import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, pink, lightBlue } from "@mui/material/colors";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddArticle from './article/add-article';
import AllArticle from './article/all-article';
import DetailArticle from "./article/detail-article";
import EditArticle from "./article/edit-article";

const main_theme = createTheme({
    palette: {
        secondary: {
            main: pink[500],
            light: lightBlue[900]
        },
        primary: {
            main: lightBlue[300],
            contrastText: lightBlue[50]
        }
    }
})

console.log(main_theme);

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
