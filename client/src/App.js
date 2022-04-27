// require('dotenv').config()
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddArticle from './article/add-article';
import AllArticle from './article/all-article';
import DetailArticle from "./article/detail-article";
import EditArticle from "./article/edit-article";

function App() {
    return (
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
    );
}

export default App;
