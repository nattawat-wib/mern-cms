import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Divider, TextField, Container, Grid, Button, Backdrop, CircularProgress} from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import { NotifySnackbar } from "../components/Notification";

const EditArticle = () => {
    const [article, setArticle] = useState({
        title: "",
        desc: "",
        url: ""
    });
    
    const [image, setImage] = useState({
        banner: null, // from input type file
        thumbnail: null // from input type file
    });

    const [isLoading, setIsLoading] = useState(true);    
    const [notify, setNotify] = useState({
        is_open: false,
        status: "",
        title: "",
        message: ""
    })

    const { url } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/article/${url}`).then(resp => {
            setArticle(resp.data.data)
            setImage({
                banner: resp.data.data.banner,
                thumbnail: resp.data.data.thumbnail,
            })
            setIsLoading(false)
        })
    }, [])

    const handle_submit = e => {
        e.preventDefault()
        const article_form = new FormData();
        article_form.append("article", JSON.stringify(article))
        article_form.append("thumbnail", image.thumbnail)
        article_form.append("banner", image.banner)

        axios.put(`${process.env.REACT_APP_API_URL}/article/${article.url}`, article_form).then(resp => {
            setNotify({ is_open: true, status: resp.data.status, message: resp.data.message })
            if(resp.data.status === "success") {
                window.location.href = "/"
            }
        })
    }

    const handle_image_select = e => setImage({ ...image, [e.target.name]: e.target.files[0]})
    const handle_article_change = e => setArticle({ ...article, [e.target.name]: e.target.value })

    return (
        <Fragment>
            <NotifySnackbar notify={notify} setNotify={setNotify} />
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading} > <CircularProgress color="inherit" /> </Backdrop>                        
            <Container maxWidth="sm">
                <form onSubmit={handle_submit}>
                    <h1 className="text-center"> Edit Article </h1>
                    <Divider />
                    <TextField onChange={handle_article_change} label="title" name="title" fullWidth size="small" className="my-4" value={article.title} />
                    <CKEditor editor={ClassicEditor} data={article.desc || "<p> write article detail here </p>"}
                        onChange={(e, editor) => setArticle(prev_data => ({ ...prev_data, desc: editor.getData() }))}
                    />
                    <TextField onChange={handle_article_change} label="url" name="url" fullWidth size="small" className="my-4" value={article.url} />
                    <Grid container className="text-center" spacing={2}>
                        {
                            ["thumbnail", "banner"].map((upload_for, i) => (
                                <Grid item xs={12} sm={6} className="mt-3 mb-5" key={i}>
                                    <figure className="w-100 position-relative" style={{ paddingTop: "52.65%" }}>
                                        <img className="fit-img" src={image[upload_for] ? `http://localhost:8080/uploads/${article[upload_for]}` : "https://via.placeholder.com/1920x1080.png/09f/fff" } />
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