import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddArticle from './article/add-article';
import AllArticle from './article/all-article';
import DetailArticle from "./article/detail-article";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="p-4">
                <Routes>
                    <Route index path="/add-article" element={<AddArticle />} />
                    <Route path="/" element={<AllArticle />} />
                    <Route path="/all-article" element={<AllArticle />} />
                    <Route path="/article/:url" element={<DetailArticle />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
