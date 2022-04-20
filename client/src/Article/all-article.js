import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const AllArticle = () => {
    const get_all_article = () => {
        axios.get("http://localhost:8080/article").then(resp => set_all_article(resp.data.data))
    }

    const [all_article, set_all_article] = useState([]);
    useEffect(get_all_article, [])

    const delete_article = url => {
        axios.delete(`http://localhost:8080/article/${url}`).then(resp => {
            if(resp.data.status == "success" ) get_all_article()
        })
    }

    return (
        <Fragment>
            <Grid container spacing={3}>
                {   
                    all_article.map((article, i) => {
                        return (
                            <Grid item xs={4} key={i}>
                                <h2> {article.title} </h2>
                                <p dangerouslySetInnerHTML={{__html: article.desc}} />
                                <p> {article.url} </p>
                                <figure className="position-relative" style={{paddingTop: "56.26%"}}>
                                    <img className="fit-img" src={`/uploads/${article.banner}`} />
                                </figure>
                                <div className="text-center">
                                    <Button variant="outlined" color="secondary" onClick={() => delete_article(article.url)}> Delete </Button>
                                    <Button component={Link} to={`/article/${article.url}`} variant="outlined" color="primary"> Read More... </Button>
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