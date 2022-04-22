import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AllArticle = () => {
    const get_all_article = () => {
        axios.get("http://localhost:8080/article").then(resp => set_all_article(resp.data.data))
    }

    const [all_article, set_all_article] = useState([]);
    useEffect(get_all_article, [])

    const delete_article = url => {
        axios.delete(`http://localhost:8080/article/${url}`).then(resp => {
            if (resp.data.status == "success") get_all_article()
        })
    }

    return (
        <Fragment>
            <Grid container spacing={3}>
                {
                    all_article.map((article, i) => {
                        return (
                            <Grid item xs={4} key={i}>
                                <h2 className="line-clamp-2"> {article.title} </h2>
                                <p className="line-clamp-4" dangerouslySetInnerHTML={{ __html: article.desc }} />
                                <figure className="position-relative" style={{ paddingTop: "56.26%" }}>
                                    <img className="fit-img" src={`http://localhost:8080/uploads/${article.thumbnail}`} />
                                </figure>
                                <small> Date : {article.createdDate} </small>
                                <div className="mt-3 d-flex justify-content-center">
                                    <Tooltip className="mx-2 d-block" title="Edit" arrow>
                                        <Button variant="outlined" color="secondary" component={Link} to={`/article/edit/${article.url}`}>
                                            <EditIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip className="mx-2 d-block" title="Delete" arrow>
                                        <Button variant="outlined" color="warning" onClick={() => delete_article(article.url)}>
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