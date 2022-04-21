import { useState, useEffect } from "react";
import { Container, TextField, Button, Grid } from "@mui/material";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from "axios";

const AddArticle = () => {
    const [article, updateArticle] = useState({});
    const [image, setImage] = useState({});

    const changeArticle = e => updateArticle(prev_data => ({ ...prev_data, [e.target.name]: e.target.value }))
    const submitArticle = e => {
        e.preventDefault()

        const article_form = new FormData();
        
        article_form.append("banner", image.banner)
        article_form.append("article", JSON.stringify(article))

        console.log(article_form);

        axios.post("http://localhost:8080/article", article_form).then(resp => {
            console.log(resp);
        })

        axios({
            method: "post",
            url: "http://localhost:8080/test-upload",
            data: article_form,
            headers: { "Content-Type": "multipart/form-data" },
        })

        updateArticle({})
        setImage({})
    }

    const handle_image_select = e => {
        setImage(prev => ({ ...prev, [e.target.name]: e.target.files[0] }))
    }

    return (
        <Container maxWidth="sm" className="my-5">
            <form onSubmit={submitArticle}>
                <h1 className="text-center"> Add Article </h1>
                <br />
                <hr />
                <br />
                <TextField onChange={changeArticle} value={article.title || ""} name="title" className="mb-4" fullWidth label="title" size="small" color="primary" />
                <CKEditor editor={ClassicEditor} data={article.name || "<p> write article detail here </p>"}
                    onChange={(e, editor) => updateArticle(prev_data => ({ ...prev_data, desc: editor.getData() }))}
                />
                <TextField onChange={changeArticle} value={article.url || ""} name="url" className="my-4" fullWidth label="url" size="small" color="primary" helperText="url should not contain space or /" />

                <h4 className="mb-0"> File upload </h4>
                <Grid container className="text-center" spacing={2}>
                    {
                        ["thumbnail", "banner"].map((upload_for, i) => (
                            <Grid item xs={12} sm={6} className="mt-3 mb-5" key={i}>
                                <figure className="w-100 position-relative" style={{ paddingTop: "52.65%" }}>
                                    <img className="fit-img" src={image[upload_for] ? URL.createObjectURL(image[upload_for]) : "https://via.placeholder.com/1920x1080.png/09f/fff"} />
                                </figure>
                                <Button size="small" component="label" variant="outlined" startIcon={<FileUploadIcon />}>
                                    <input type="file" name={upload_for} onChange={handle_image_select} hidden />
                                    {upload_for}
                                </Button>
                                {image[upload_for] ? <DeleteIcon onClick={() => setImage(prev => ({ ...prev, [upload_for]: null }))} className="text-danger" /> : null}
                            </Grid>
                        ))
                    }
                </Grid>

                <div className="text-end">
                    <Button type="submit" startIcon={<AddCircleIcon />} variant="contained"> Add Article </Button>
                </div>
            </form>
        </Container>
    )
}

export default AddArticle