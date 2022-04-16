import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddArticle from './Article/add-article';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route index path="/add-article" element={<AddArticle />} />
                <Route path="" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
