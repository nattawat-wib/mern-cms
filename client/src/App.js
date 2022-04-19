import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddArticle from './article/add-article';
import AllArticle from './article/all-article';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route index path="/add-article" element={<AddArticle />} />
                <Route path="/" element={<AllArticle />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
