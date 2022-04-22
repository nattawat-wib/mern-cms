import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Divider, TextField, Container, Grid, Button } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const EditArticle = () => {
    const [article, setArticle] = useState({});
    const [image, setImage] = useState({});

    const handle_image_select = e => {
        setImage(prev => ({ ...prev, [e.target.name]: e.target.files[0] }))
    }

    const { url } = useParams();

    useEffect(() => {

        axios.get(`http://localhost:8080/article/${url}`).then(resp => {
            console.log(resp);
            setArticle(resp.data.data)
        })
    }, [])

    return (
        <Fragment>
            <Container maxWidth="sm">
                <form>
                    <h1 className="text-center"> Edit Article </h1>
                    <Divider />
                    <TextField label="title" fullWidth size="small" className="my-4" value={article.title} />
                    <CKEditor editor={ClassicEditor} data={article.desc || "<p> write article detail here </p>"}
                        onChange={(e, editor) => setArticle(prev_data => ({ ...prev_data, desc: editor.getData() }))}
                    />
                    <TextField label="url" fullWidth size="small" className="my-4" value={article.url} />
                    <h4 className="mb-0"> File upload </h4>
                    <Grid container className="text-center" spacing={2}>
                        {
                            ["thumbnail", "banner"].map((upload_for, i) => (
                                <Grid item xs={12} sm={6} className="mt-3 mb-5" key={i}>
                                    <figure className="w-100 position-relative" style={{ paddingTop: "52.65%" }}>
                                        <img className="fit-img" src={image[upload_for] ? URL.createObjectURL(image[upload_for]) : `${article[upload_for] ? `http://localhost:8080/uploads/${article[upload_for]}` : "https://via.placeholder.com/1920x1080.png/09f/fff"}`} />
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
        </Fragment>
    )
}

export default EditArticle