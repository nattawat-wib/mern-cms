import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Tooltip, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { NotifyDialog, NotifySnackbar } from "../components/Notification";
import { CardTitle, CartDetail, CardWrapper, CardThumbnail } from "./components/article-card";

const AllArticle = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [notify, setNotify] = useState({
        is_open: false,
        title: "",
        message: "",
        status: "",
    })
    const [dialog, setDialog] = useState({
        is_open: false,
        title: "",
        message: "",
        data: {
            id: ""
        }
    })

    const get_all_article = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/article`).then(resp => {
            set_all_article(resp.data.data)
            setIsLoading(false)
        })
    }

    const [all_article, set_all_article] = useState([]);
    useEffect(get_all_article, [])

    const delete_article = () => {
        const url = dialog.data.url
        axios.delete(`${process.env.REACT_APP_API_URL}/article/${url}`).then(resp => {
            if (resp.data.status === "success") {
                get_all_article()
                setDialog({ ...dialog, is_open: false })
            } else {
                setNotify({ ...notify, is_open: true })
            }
        })
    }

    return (
        <Fragment>
            <NotifySnackbar notify={notify} setNotify={setNotify} />
            <NotifyDialog dialog={dialog} setDialog={setDialog} callback={delete_article} />

            <Grid container spacing={3}>
                {
                    all_article.map((article, i) => {
                        return (
                            <Grid item xs={4} key={i}>
                                <CardWrapper>
                                    <CardTitle variant="h2" mb={2}> {article.title} </CardTitle>
                                    <CartDetail dangerouslySetInnerHTML={{ __html: article.desc }} />
                                    <CardThumbnail>
                                        <img className="fit-img" src={`http://localhost:8080/uploads/${article.thumbnail}`} />
                                    </CardThumbnail>

                                    <small className="d-flex align-items-center"> 
                                        <CalendarMonthIcon color="primary" sx={{mr: .5}} />
                                        {article.createdDate} 
                                    </small>
                                    <div className="mt-3 d-flex justify-content-center">
                                        <Tooltip title="Edit" arrow>
                                            <IconButton size="small" color="secondary" component={Link} to={`/article/edit/${article.url}`}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip sx={{ mx: 2}} title="Delete" arrow>
                                            <IconButton size="small" color="warning" onClick={() => setDialog({ ...dialog, data: { url: article.url }, is_open: true })}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Button variant="outlined" size="small" component={Link} to={`/article/${article.url}`}> Read More... </Button>
                                    </div>
                                </CardWrapper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Fragment>
    )
}

export default AllArticle