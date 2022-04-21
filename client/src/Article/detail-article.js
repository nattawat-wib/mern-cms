import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material"
import axios from "axios";

const Detail_article = () => {
    const { url } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        console.log("22");
        
        axios.get(`http://localhost:8080/article/${url}`).then(resp => {
            setArticle(resp.data.data)
        })
    }, [])

    return (
        <Fragment>
            <Container maxWidth="md">
                <h1> {article.title} </h1>
                <small> {article.createdDate} </small>
                <figure className="position-relative" style={{paddingTop: "40.26%"}}>
                        <img className="fit-img" src={`/uploads/${article.banner}`} />
                </figure>
                <section>
                    <p dangerouslySetInnerHTML={{ __html: article.desc }} />
                </section>
            </Container>
        </Fragment>
    )
}

export default Detail_article