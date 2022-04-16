import { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

const AddArticle = () => {
    const [article, updateArticle] = useState({});
    const changeArticle = e => updateArticle(prev_data => ({ ...prev_data, [e.target.name]: e.target.value }))
    const submitArticle = e => {
        e.preventDefault()
        console.log(article);
        axios.post("/", article).then(resp => {
            console.log(resp);
        })

        updateArticle({})
    }

    return (
        <Container maxWidth="sm" className="my-5">
            <form onSubmit={submitArticle}>
                <h1 className="text-center"> Add Article </h1>
                <br />
                <hr />
                <br />
                <TextField  onChange={changeArticle} value={article.title || ""} name="title" className="my-4" fullWidth label="title" size="small" color="primary" />
                <CKEditor editor={ClassicEditor} data={article.name || "<p> write article detail here </p>"}
                    onChange={(e, editor) => updateArticle(prev_data => ({ ...prev_data, desc: editor.getData() }))}
                />
                <TextField  onChange={changeArticle} value={article.url || ""} name="url" className="my-4" fullWidth label="url" size="small" color="primary" />

                <Button type="submit" variant="contained" color="primary" className="ms-auto d-block"> Add Article </Button>
            </form>
        </Container>
    )
}

export default AddArticle