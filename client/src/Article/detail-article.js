import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Backdrop, CircularProgress } from "@mui/material"
import axios from "axios";

const Detail_article = () => {
    const { url } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {        
        axios.get(`http://localhost:8080/article/${url}`).then(resp => {
            setArticle(resp.data.data)
            setIsLoading(false)
        })
    }, [])

    return (
        <Fragment>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading} > <CircularProgress color="inherit" /> </Backdrop>                        
            <Container maxWidth="md">
                <h1> {article.title} </h1>
                <small> {article.createdDate} </small>
                <figure className="position-relative" style={{paddingTop: "40.26%"}}>
                        <img className="fit-img" src={`http://localhost:8080/uploads/${article.banner}`} />
                </figure>
                <section>
                    <p dangerouslySetInnerHTML={{ __html: article.desc }} />
                </section>
            </Container>
        </Fragment>
    )
}

export default Detail_article