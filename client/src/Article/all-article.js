import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { NotifyDialog, NotifySnackbar } from "../components/Notification";

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
                                <Typography sx={{ fontSize: "2rem" }} variant="h2" className="line-clamp-2"> {article.title} </Typography>
                                <p className="line-clamp-4" dangerouslySetInnerHTML={{ __html: article.desc }} />
                                <figure className="position-relative" style={{ paddingTop: "56.26%" }}>
                                    <img className="fit-img" src={`http://localhost:8080/uploads/${article.thumbnail}`} />
                                </figure>
                                <small> Date : {article.createdDate} </small>
                                <div className="mt-3 d-flex justify-content-center">
                                    <Tooltip sx={{ mx: 1, display: "block" }} title="Edit" arrow>
                                        <Button variant="outlined" color="secondary" component={Link} to={`/article/edit/${article.url}`}>
                                            <EditIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip className="mx-2 d-block" title="Delete" arrow>
                                        <Button variant="outlined" color="warning" onClick={() => setDialog({ ...dialog, data: { url: article.url }, is_open: true })}>
                                            <DeleteIcon />
                                        </Button>
                                    </Tooltip>
                                    <Button variant="outlined" className="mx-2 d-block" component={Link} to={`/article/${article.url}`}> Read More... </Button>
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Fragment>
    )
}

export default AllArticle