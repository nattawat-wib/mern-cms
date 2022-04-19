import { Fragment, useEffect, useState } from "react";
import axios from "axios";

const AllArticle = () => {
    const [all_article, set_all_article] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/article").then(resp => {
            console.log("resp", resp);

            set_all_article(resp.data.data)
        })
    }, [])

    return (
        <Fragment>
            <h1> test </h1>
            {   
                all_article.map((article, i) => {
                    return (
                        <div>
                            <h2> {article.title} </h2>
                            <p> {article.desc} </p>
                            <p> {article.url} </p>
                            {/* <img src={`/uploads/${article.banner}`} /> */}
                        </div> 
                    )
                })
            }
        </Fragment>
    )
}

export default AllArticle